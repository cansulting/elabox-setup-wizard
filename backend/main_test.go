package main

import (
	"elabox-setup/backend/info"
	"elabox-setup/backend/setup_did"
	"elabox-setup/backend/setup_keystore"
	"elabox-setup/backend/setup_usb"
	"os"
	"testing"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

func Test_DetectUSB(t *testing.T) {
	logger.Init("ela.setup.test")
	setup_usb.Init()
	time.Sleep(time.Second * 30)

}

func Test_Usb(t *testing.T) {
	logger.Init("ela.setup.test")
	if err := setup_usb.SetupAtHome("sdb", "/home/elabox2"); err != nil {
		t.Error(err.Error())
	}
}

// expected an issue while generating keystore
func Test_KeystoreGen_Failure(t *testing.T) {
	logger.Init("ela.setup.test")
	if err := setup_keystore.Setup("erwr"); err == nil {
		t.Error("expected an error for password but nothing was recieved")
	}
}

func Test_KeystoreGen_Success(t *testing.T) {
	logger.Init("ela.setup.test")
	if wassetup := setup_keystore.WasSetup(); wassetup {
		t.Log("keystore was already setup, process skipped")
		return
	}
	wd, _ := os.Getwd()
	if err := os.Chdir(wd + "/../build/bin"); err != nil {
		t.Error(err)
		return
	}
	if err := setup_keystore.Setup("helloworld"); err != nil {
		t.Error(err)
	}
}
func Test_DidSetup(t *testing.T) {
	logger.Init("ela.setup.test")
	if err := setup_did.Setup(`{"holder":"this is a sample did"}`); err != nil {
		t.Error(err)
	}
}

func Test_KeystoreDownload(t *testing.T) {
	if _, err := setup_keystore.Download(); err != nil {
		t.Error(err)
	}
}

func Test_InfoDownload(t *testing.T) {
	if _, err := info.Download(); err != nil {
		t.Error(err)
	}
}

// expect a password failure
func Test_PasswordCheck_Failed(t *testing.T) {
	logger.Init("ela.setup.test")
	if err := setup_keystore.CheckPassErrors("sdfsdfsd&|`$"); err == nil {
		t.Error("expected unix character error")
	}
	if err := setup_keystore.CheckPassErrors("dfdsf"); err == nil {
		t.Error("expected error due to small characters")
	}
	if err := setup_keystore.CheckPassErrors("asdasdasd asdasd"); err == nil {
		t.Error("expected error because of space")
	}
}
