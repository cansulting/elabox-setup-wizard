package setup_usb

import (
	"elabox-setup/backend/broadcast"
	"elabox-setup/backend/data"
	"elabox-setup/backend/global"
	"elabox-setup/backend/utils"
	"os"
	"strings"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/errors"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/perm"
	"github.com/cansulting/elabox-system-tools/foundation/system"
	"github.com/jaypipes/ghw"
	"github.com/jaypipes/ghw/pkg/block"
)

var initialized = false
var lastDrives []*block.Disk = nil

// return true if already setup
func Init() (bool, []data.StorageInfo) {
	if WasSetup() {
		return true, nil
	}

	storages := make([]data.StorageInfo, 0)
	if lastDrives != nil {
		storages = getStorageInfo(lastDrives)
	}
	if initialized {
		broadcast.PublishStorageChanged(storages)
		return false, storages
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
	return false, storages
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

func UpdateFstab(storageId string, cwd string, homeDir string) error {
	stmt := "sudo blkid | grep /dev/" + storageId + " | cut -d '\"' -f 2"
	output, err := utils.RunBashStmt(stmt, cwd)
	output = strings.TrimRight(output, "\n")
	print(output)
	if err != nil {
		return errors.SystemNew("failed to update fstab", err)
	}
	stmt = "echo '\nUUID=" + output + " " + homeDir + " ext4 defaults 0 0' | "
	stmt += "tee -a /etc/fstab > /dev/null"
	if _, err := utils.RunBashStmt(stmt, cwd); err != nil {
		return errors.SystemNew("failed to update fstab", err)
	}
	_, err = utils.RunBashStmt("chown -R elabox:elabox "+homeDir, cwd)
	return err
}

func Setup(storageId string) error {
	return SetupAtHome(storageId, global.HOME_DIR)
}

func SetupAtHome(storageId string, homePath string) error {
	if storageId != "" {
		homeDir := "/home/elabox"
		tmpDir := "/home/tmp"
		dir := ""
		if system.IDE {
			dir = "../build"
		}
		// step: move elabox file to tmp
		if err := utils.CopyDirectory(homeDir, tmpDir); err != nil {
			return errors.SystemNew("failed to copy from "+homeDir+" to "+tmpDir, err)
		}
		// remove home
		if err := os.RemoveAll(homeDir); err != nil {
			logger.GetInstance().Error().Err(err).Msg("failed to remove " + homeDir + ", continue.")
		}
		// step: mount storage and make it home
		if _, err := utils.RunBashStmt("echo 'y' |  mkfs.ext4 /dev/"+storageId, dir); err != nil {
			return errors.SystemNew("failed to partition storage "+storageId, err)
		}
		if err := os.MkdirAll(homeDir, perm.PUBLIC); err != nil {
			return errors.SystemNew("failed to create dir "+homeDir, err)
		}
		if _, err := utils.RunBashStmt("mount /dev/"+storageId+" "+homeDir, dir); err != nil {
			return errors.SystemNew("failed to mount storage "+storageId, err)
		}
		// step: move tmp to the new home
		if err := utils.CopyDirectory(tmpDir, homeDir); err != nil {
			return errors.SystemNew("failed to copy "+tmpDir+" to "+homeDir, err)
		}
		// remove tmp
		if err := os.RemoveAll(tmpDir); err != nil {
			logger.GetInstance().Error().Err(err).Msg("failed to remove " + tmpDir + ", continue.")
		}
		// step: update fstab
		if err := UpdateFstab(storageId, dir, homeDir); err != nil {
			return err
		}
		// if err := utils.RunBashFile(
		// 	"storage.sh "+storageId+" "+homePath,
		// 	dir,
		// ); err != nil {
		// 	return err
		// }
	} else {
		logger.GetInstance().Debug().Msg("external storage setup skip")
	}
	return nil
}
