package broadcast

import (
	backend_data "elabox-setup/backend/data"
	"elabox-setup/backend/global"
	"strconv"

	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

// broadcast error to system
func PublishError(code int, err string) error {
	logger.GetInstance().Error().Msg("publish error: " + err)
	val := `{"code":` + strconv.Itoa(code) + `,"error":"` + err + `"}`
	_, err2 := global.Controller.RPC.CallBroadcast(data.NewAction(global.BROADCAST_ERROR, global.PACKAGE_ID, val))
	if err2 != nil {
		return err2
	}
	return nil
}

// broacast storage changes to system
func PublishStorageChanged(drives []backend_data.StorageInfo) error {
	logger.GetInstance().Debug().Msg("Storages devices changed: " + printArry(drives))
	_, err := global.Controller.RPC.CallBroadcast(data.NewAction(global.BROADCAST_STORAGE_CHANGED, global.PACKAGE_ID, drives))
	if err != nil {
		return err
	}
	return nil
}

func PublishSetupSuccess() error {
	logger.GetInstance().Debug().Msg("Setup success")
	_, err := global.Controller.RPC.CallBroadcast(data.NewAction(global.BROADCAST_SUCCESS, global.PACKAGE_ID, nil))
	if err != nil {
		logger.GetInstance().Error().Err(err).Caller().Msg("setup failed")
	}
	return err
}

func printArry(arry []backend_data.StorageInfo) string {
	if len(arry) == 0 {
		return ""
	}
	val := ""
	for _, v := range arry {
		val += v.Model + ","
	}
	return val
}
