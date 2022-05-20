package setup_keystore

import (
	"os/exec"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

// return true if already setup
func Init() bool {
	if WasSetup() {
		return true
	}

	return false
}

func InitDone() {

}

// return true if already setup
func WasSetup() bool {
	return false
}

func checkPassErrors(pass string) error {
	return nil
}

func GenerateKeystore(pass string) error {
	cliPath := ""
	dataPath := ""
	cmd := exec.Command(cliPath+"/ela_cli",
		"wallet",
		"create",
		"-p",
		pass,
	)
	cmd.Dir = dataPath
	contents, err := cmd.CombinedOutput()
	logger.GetInstance().Debug().Msg(string(contents))
	return err
}

func Setup(password string) error {
	if err := checkPassErrors(password); err != nil {
		return err
	}
	return GenerateKeystore(password)
}
