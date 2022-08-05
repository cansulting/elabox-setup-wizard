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
	storages := make([]data.StorageInfo, 0)
	if lastDrives != nil {
		storages = getStorageInfo(lastDrives)
	}
	if initialized {
		broadcast.PublishStorageChanged(storages)
		return WasSetup(), storages
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
	return WasSetup(), storages
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

func getStorageDiskById(id string) (*block.Disk, error) {
	blk, err := ghw.Block()
	if err != nil {
		return nil, err
	}
	for _, disk := range blk.Disks {
		if disk.Name == id {
			return disk, nil
		}
	}
	return nil, nil
}

func InitDone() {
	initialized = false
}

// return true if already setup
func WasSetup() bool {
	// look up for fstab
	search := "/home/elabox"
	con, err := os.ReadFile("/etc/fstab")
	if err != nil {
		return false
	}
	return strings.Contains(string(con), search)
}

func UpdateFstab(storageId string, cwd string, homeDir string) error {
	stmt := "sudo blkid | grep /dev/" + storageId + " | cut -d '\"' -f 2"
	uuid, err := utils.RunBashStmt(stmt, cwd)
	uuid = strings.TrimRight(uuid, "\n")
	//print(output)
	if err != nil {
		return errors.SystemNew("failed to update fstab", err)
	}
	stmt = "echo '\nUUID=" + uuid + " " + homeDir + " ext4 defaults 0 0' | "
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
		dir := ""
		if system.IDE {
			dir = "../build"
		}
		if err := ValidateStorage(storageId); err != nil {
			return err
		}
		// step: mount storage and make it home
		if _, err := utils.RunBashStmt("echo 'y' |  sudo mkfs.ext4 /dev/"+storageId, dir); err != nil {
			return errors.SystemNew("failed to partition storage "+storageId, err)
		}
		if err := os.MkdirAll(homeDir, perm.PUBLIC); err != nil {
			return errors.SystemNew("failed to create dir "+homeDir, err)
		}
		if _, err := utils.RunBashStmt("mount /dev/"+storageId+" "+homeDir, dir); err != nil {
			return errors.SystemNew("failed to mount storage "+storageId, err)
		}
		// step: update fstab
		if err := UpdateFstab(storageId, dir, homeDir); err != nil {
			return err
		}
	} else {
		logger.GetInstance().Debug().Msg("external storage setup skip")
	}
	return nil
}

func ValidateStorage(storageId string) error {
	// step: validate storage
	disk, err := getStorageDiskById(storageId)
	if err != nil {
		return errors.SystemNew("failed to process storage with id "+storageId, err)
	}
	if disk == nil {
		return errors.SystemNew("storage was not found, please attach it.", nil)
	}
	// for _, part := range disk.Partitions {
	// 	if part.IsReadOnly {
	// 		return errors.SystemNew("disk is read-only", nil)
	// 	}
	// }
	return nil
}
