package main

import (
	"elabox-setup/backend/broadcast"
	"elabox-setup/backend/global"
	"elabox-setup/backend/info"
	"elabox-setup/backend/setup_did"
	"elabox-setup/backend/setup_keystore"
	"elabox-setup/backend/setup_usb"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/event/protocol"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

var settingUp = false

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
	global.Controller.RPC.OnRecieved(global.CHECK_SETUP, instance.checkSetupStatus)
	global.Controller.RPC.OnRecieved(global.DOWNLOAD_KEYSTORE, instance.downloadFile)
	global.Controller.RPC.OnRecieved(global.GET_INFO, instance.getInfo)
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
		wasSetup, storages := setup_usb.Init()
		storageInfo := make(map[string]interface{})
		status := "not_setup"
		if wasSetup {
			status = "setup"
		}
		storageInfo["status"] = status
		storageInfo["storage_list"] = storages
		return rpc.CreateJsonResponse(rpc.SUCCESS_CODE, storageInfo)

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

// start setting up the device. accepts json data with field usb, did and password
func (instance *MyService) setup(client protocol.ClientInterface, action data.Action) string {
	if settingUp {
		return rpc.CreateSuccessResponse("success")
	}
	logger.GetInstance().Info().Msg("start setting up elabox")
	settingUp = true
	go func() {
		defer func() {
			settingUp = false
		}()
		datam, err := action.DataToMap()
		if err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "error setup, "+err.Error())
			return
		}
		if err := setup_usb.Setup(datam["storage_id"].(string)); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "external storage setup failed, "+err.Error())
			return
		}
		if err := setup_did.Setup(datam["did"].(string)); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "did setup failed, "+err.Error())
			return
		}
		if err := setup_keystore.Setup(datam["password"].(string)); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "keystore setup failed, "+err.Error())
			return
		}
		if err := SetupSwapping(); err != nil {
			broadcast.PublishError(rpc.INVALID_CODE, "memory swapping setup failed, "+err.Error())
			return
		}
		time.Sleep(time.Second * 1)
		broadcast.PublishSetupSuccess()
	}()

	return rpc.CreateSuccessResponse("success")
}

func (instance *MyService) checkSetupStatus(client protocol.ClientInterface, action data.Action) string {
	setup := "setup"
	if settingUp {
		setup = "setting_up"
	} else if !setup_keystore.WasSetup() {
		setup = "unsetup"
	}
	return rpc.CreateSuccessResponse(setup)
}

func (instance *MyService) downloadFile(client protocol.ClientInterface, action data.Action) string {
	var text = ""
	var err error
	switch action.DataToString() {
	case "keystore":
		text, err = setup_keystore.Download()
		if err != nil {
			broadcast.PublishError(global.DOWNLOAD_FILE_ERROR_CODE, "download keystore file failed, "+err.Error())
			return ""
		}
	default:
		return rpc.CreateResponse(rpc.INVALID_CODE, "unable to init given the data "+action.DataToString())
	}
	return rpc.CreateSuccessResponse(text)
}
func (instance *MyService) getInfo(client protocol.ClientInterface, action data.Action) string {
	var text = ""
	var err error
	switch action.DataToString() {
	case "info":
		text, err = info.Download()
		if err != nil {
			broadcast.PublishError(global.READING_INFO_FILE_ERROR_CODE, "cant read info.json, "+err.Error())
			return ""
		}
	}
	return rpc.CreateSuccessResponse(text)
}
