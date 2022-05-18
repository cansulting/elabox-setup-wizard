package main

import (
	"elabox-setup/backend/broadcast"
	"elabox-setup/backend/global"
	"elabox-setup/backend/setup_did"
	"elabox-setup/backend/setup_keystore"
	"elabox-setup/backend/setup_usb"

	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/event/protocol"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

type MyService struct {
}

func (instance *MyService) IsRunning() bool {
	return true
}

func (instance *MyService) OnEnd() error {
	return nil
}

func (instance *MyService) OnStart() error {
	global.Controller.RPC.OnRecieved(global.INIT_SETUP, instance.init)
	global.Controller.RPC.OnRecieved(global.INITDONE_SETUP, instance.initDone)
	global.Controller.RPC.OnRecieved(global.START_SETUP, instance.setup)
	global.Controller.RPC.OnRecieved(global.CHECK_SETUP, instance.checkSetup)
	return nil
}

func (instance *MyService) init(client protocol.ClientInterface, action data.Action) string {
	wasSetup := false
	switch action.DataToString() {
	case global.DID:
		wasSetup = setup_did.Init()
	case global.PASSWORD:
		wasSetup = setup_keystore.Init()
	case global.STORAGE:
		wasSetup = setup_usb.Init()
	default:
		return rpc.CreateResponse(rpc.INVALID_CODE, "unable to init given the data "+action.DataToString())
	}
	if wasSetup {
		return rpc.CreateSuccessResponse("setup")
	} else {
		return rpc.CreateSuccessResponse("not_setup")
	}
}

func (instance *MyService) initDone(client protocol.ClientInterface, action data.Action) string {
	switch action.DataToString() {
	case global.DID:
		setup_did.InitDone()
	case global.PASSWORD:
		setup_keystore.InitDone()
	case global.STORAGE:
		setup_usb.InitDone()
	default:
		return rpc.CreateResponse(rpc.INVALID_CODE, "unable to init given the data "+action.DataToString())
	}
	return rpc.CreateSuccessResponse("success")
}

// start setting up the device. requires field with usb, did and keystore
func (instance *MyService) setup(client protocol.ClientInterface, action data.Action) string {
	go func() {
		logger.GetInstance().Info().Msg("starting setting up")
		datam, err := action.DataToMap()
		if err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "error setup, "+err.Error())
		}
		if err := setup_usb.Setup(datam["storage_id"].(string)); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "external storage setup failed, "+err.Error())
		}
		if err := setup_did.Setup(datam["did"].(string)); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "did setup failed, "+err.Error())
		}
		if err := setup_keystore.Setup(datam["password"].(string)); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "keystore setup failed, "+err.Error())
		}
		if err := SetupSwapping(); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "memory swapping setup failed, "+err.Error())
		}
	}()

	return rpc.CreateSuccessResponse("success")
}

func (instance *MyService) checkSetup(client protocol.ClientInterface, action data.Action) string {
	setup := "setup"
	if !setup_keystore.WasSetup() {
		setup = "unsetup"
	}
	return rpc.CreateSuccessResponse(setup)
}
