//go:build linux
// +build linux

package main

import (
	"elabox-setup/backend/utils"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

func SetupSwapping() error {
	// memory swapping
	logger.GetInstance().Debug().Msg("init swapping...")
	return utils.RunBashFile("swapping.sh", "")
}
