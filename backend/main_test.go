package main

import (
	"elabox-setup/backend/setup_usb"
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
