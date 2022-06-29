package main

import (
	"elabox-setup/backend/broadcast"
	"elabox-setup/backend/global"
	"elabox-setup/backend/utils"

	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

func SetupSwapping() error {
	// memory swapping
	logger.GetInstance().Debug().Msg("init swapping...")
	return utils.RunBash("/bin/bash swapping.sh", "")
}

func MarkAsSuccess() error {
	_, err := global.Controller.RPC.CallSystem(data.NewActionById(global.SYSTEM_CONFIGURED))
	broadcast.PublishSetupSuccess()
	return err
}
