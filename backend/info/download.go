package info

import (
	"elabox-setup/backend/global"
	"encoding/base64"
	"os"
)

func Download() (string, error) {
	currentWorkingDirectory, _ := os.Getwd()
	content, err := os.ReadFile(currentWorkingDirectory + global.INFO_PATH)
	if err != nil {
		return "", err
	}
	text := base64.StdEncoding.EncodeToString(content)
	return text, err
}
