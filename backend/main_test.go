package main

import (
	"elabox-setup/backend/setup_did"
	"elabox-setup/backend/setup_keystore"
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
