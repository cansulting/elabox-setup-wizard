package setup_keystore

import (
	"elabox-setup/backend/broadcast"
	"elabox-setup/backend/global"
	"encoding/base64"
	"os"

	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
)

func Download() (string, error) {
	content, err := os.ReadFile(global.KEYSTORE_PATH)
	if err != nil {
		broadcast.PublishError(rpc.DOWNLOAD_FILE_ERROR_CODE, "download keystore file failed, "+err.Error())
	}
	text := base64.StdEncoding.EncodeToString(content)
	return text, err
}
