package main

import (
	"elabox-setup/backend/global"

	"github.com/cansulting/elabox-system-tools/foundation/app"
)

func main() {
	con, err := app.NewController(nil, &MyService{})
	if err != nil {
		panic(err)
	}
	global.Controller = con
	app.RunApp(con)
}
