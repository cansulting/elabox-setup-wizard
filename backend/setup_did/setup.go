package setup_did

import (
	"crypto/sha256"
	"elabox-setup/backend/global"
	"encoding/json"
	"errors"
	"os"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/perm"
	"github.com/cansulting/elabox-system-tools/foundation/system"
)

// return true if already setup
func Init() bool {
	return WasSetup()
}

func InitDone() {

}

// return true if already setup
func WasSetup() bool {
	if _, err := os.Stat(global.DID_HASH_PATH); err != nil {
		return false
	}
	return true
}

func Setup(presentationStr string) error {
	if presentationStr == "" {
		logger.GetInstance().Debug().Msg("did setup was skipped, empty presentation was passed.")
		return nil
	}
	presentationMap := make(map[string]interface{})
	// step: read did from presentation param
	if err := json.Unmarshal([]byte(presentationStr), &presentationMap); err != nil {
		return errors.New("failed to decode Did presentation, " + err.Error())
	}
	if presentationMap["holder"] == nil || presentationMap["holder"] == "" {
		return errors.New("holder is not valid")
	}
	did := presentationMap["holder"].(string)
	// step: create hash
	serialD := system.GetDeviceInfo().Serial
	hash := sha256.Sum256([]byte(did + serialD))
	// step: save to file
	if err := os.MkdirAll(global.DID_DATA_DIR, perm.PUBLIC_WRITE); err != nil {
		return err
	}
	if err := os.WriteFile(global.DID_HASH_PATH, hash[:], perm.PUBLIC_VIEW); err != nil {
		return err
	}
	return nil
}
