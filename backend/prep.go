// file for preparation
package main

import (
	"elabox-setup/backend/global"
	"errors"
	"os"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

// preparations for setup
func Preparations() error {
	// delete tmp dir if exist
	if _, err := os.Stat(global.TMP_DIR); err == nil {
		logger.GetInstance().Debug().Msg("temporary directory exist from last interrupted setup, clearing " + global.TMP_DIR)
		if err := os.RemoveAll(global.TMP_DIR); err != nil {
			return errors.New("failed to remove " + global.TMP_DIR)
		}
	}
	return nil
}
