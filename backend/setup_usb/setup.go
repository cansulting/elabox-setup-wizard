package setup_usb

import (
	"elabox-setup/backend/broadcast"
	"elabox-setup/backend/data"
	"elabox-setup/backend/global"
	"elabox-setup/backend/utils"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/system"
	"github.com/jaypipes/ghw"
	"github.com/jaypipes/ghw/pkg/block"
)

var initialized = false
var lastDrives []*block.Disk = nil

// return true if already setup
func Init() bool {
	if WasSetup() {
		return true
	}

	if initialized {
		return false
	}

	initialized = true
	lastDrives = nil

	// start checking usb drive when connected
	go func() {
		logger.GetInstance().Debug().Msg("start checking usb drives")
		var blk *block.Info
		var err error
		for initialized {
			blk, err = ghw.Block()
			if err != nil {
				broadcast.PublishError(global.USB_LOOKUP_ERR, err.Error())
				break
			}
			// was the storage list changed?
			if !isArryEquals(blk.Disks, lastDrives) {
				lastDrives = blk.Disks
				broadcast.PublishStorageChanged(getStorageInfo(lastDrives))
			}
			time.Sleep(time.Second)
		}
	}()
	return false
}

func isArryEquals(param1 []*block.Disk, param2 []*block.Disk) bool {
	if len(param1) != len(param2) {
		return false
	}
	// check if param 1 exists
	for _, v := range param1 {
		found := false
		for _, v2 := range param2 {
			if v.Name == v2.Name {
				found = true
				break
			}
		}
		if !found {
			return false
		}
	}
	return true
}

func getStorageInfo(disks []*block.Disk) []data.StorageInfo {
	storages := make([]data.StorageInfo, 0)
	for _, disk := range disks {
		if disk.DriveType == block.DRIVE_TYPE_HDD {
			storages = append(storages, data.StorageInfo{
				Id:    disk.Name,
				Model: disk.Model,
				Size:  disk.SizeBytes,
			})
		}
	}
	return storages
}

func InitDone() {
	initialized = false
}

// return true if already setup
func WasSetup() bool {
	return false
}

func Setup(storageId string) error {
	return SetupAtHome(storageId, global.HOME_DIR)
}

func SetupAtHome(storageId string, homePath string) error {
	if storageId != "" {
		dir := ""
		if system.IDE {
			dir = "../build"
		}
		if err := utils.RunBash(
			"/bin/bash storage.sh "+storageId+" "+homePath,
			dir,
		); err != nil {
			return err
		}
	} else {
		logger.GetInstance().Debug().Msg("external storage setup skip")
	}
	return nil
}
