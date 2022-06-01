package setup_keystore

import (
	"elabox-setup/backend/global"
	"encoding/base64"
	"os"
)

func Download() (string, error) {
	content, err := os.ReadFile(global.KEYSTORE_PATH)
	if err != nil {
		return "", err
	}
	text := base64.StdEncoding.EncodeToString(content)
	return text, err
}
