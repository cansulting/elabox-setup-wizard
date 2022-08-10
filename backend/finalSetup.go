package main

import (
	"elabox-setup/backend/broadcast"
	"elabox-setup/backend/global"
	"elabox-setup/backend/utils"
	"errors"

	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/system"
)

func SetupSwapping() error {
	// memory swapping
	logger.GetInstance().Debug().Msg("init swapping...")
	return utils.RunBashFile("swapping.sh", "")
}

func MarkAsSuccess() error {
	_, err := global.Controller.RPC.CallSystem(data.NewActionById(global.SYSTEM_CONFIGURED))
	if err != nil {
		return errors.New("failed to call action ela.system.CONFIGURED, " + err.Error())
	}
	if err := broadcast.PublishSetupSuccess(); err != nil {
		logger.GetInstance().Debug().Err(err).Msg("failed to publish success.")
	}
	return system.SetEnv("config", "1")
}

func IsSuccess() bool {
	return system.GetEnv("config") == "1"
}
