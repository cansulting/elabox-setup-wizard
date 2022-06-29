package info

import (
	"elabox-setup/backend/global"
	"encoding/base64"
	"os"

	"github.com/cansulting/elabox-system-tools/foundation/path"
)

func Download() (string, error) {
	systemPath := path.GetAppInstallLocation("ela.system", false)
	content, err := os.ReadFile(systemPath + global.INFO_PATH)
	if err != nil {
		return "", err
	}
	text := base64.StdEncoding.EncodeToString(content)
	return text, err
}
