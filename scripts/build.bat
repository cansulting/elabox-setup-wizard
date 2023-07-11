@echo off
REM build both server and client

set target=%GOOS%
set arch=%GOARCH%
REM values can interactive, debug, staging, production.
REM in interactive - user lets to choose which mode he wants
set mode=interactive
set gobuild="go build"
set pkid=ela.setup
set target=windows
set arch=amd64
set mode=DEBUG
set gobuild=go build -tags DEBUG

REM FLAGS
:parse_args
shift
if "%~1"=="" goto execute
set target=%0
set arch=%1
set mode=%2

:execute
go env -w GOOS=%target%
go env -w GOARCH=%arch%

if "%mode%"=="interactive" (
    echo Select 1 - DEBUG, 2 - STAGING, 3 - RELEASE. Default = DEBUG
    set /p mode=
)

if "%mode%"=="1" goto release_mode
if "%mode%"=="RELEASE" goto release_mode
if "%mode%"=="2" goto staging_mode
if "%mode%"=="STAGING" goto staging_mode

set mode=DEBUG
goto build

:release_mode
set mode=RELEASE
set gobuild=go build -ldflags "-w -s" -tags RELEASE
goto build

:staging_mode
set mode=STAGING
set gobuild=go build -tags STAGING
goto build

:build
echo Start building %target%/%arch%  %mode% reward binaries...

%gobuild% -o ..\\build\\bin\\%pkid%.exe ..\\backend 

echo Compiling frontend...
cd ..\\frontend
if not exist "..\\frontend\\node_modules" (
    npm install
)
set NODE_OPTIONS=--openssl-legacy-provider
call npm run build
if exist "..\\build\\www" (
    rmdir /s /q "..\\build\\www"
)
mkdir "..\\build\\www"
xcopy ".\\build" "..\\build\\www" /E

packager ..\\build\\packager.json
echo Done.