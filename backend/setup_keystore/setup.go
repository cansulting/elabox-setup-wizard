package setup_keystore

import (
	"elabox-setup/backend/global"
	"errors"
	"io"
	"os"
	"os/exec"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

// return true if already setup
func Init() bool {
	return WasSetup()
}

func InitDone() {

}

// return true if already setup/created
func WasSetup() bool {
	if _, err := os.Stat(global.KEYSTORE_DIR_PATH + "/" + global.KEYSTORE_FILENAME); err != nil {
		if _, err := os.Stat(global.OLD_KEYSTORE_DIR_PATH + "/" + global.KEYSTORE_FILENAME); err != nil {
			return false
		}
	}

	return true
}

func checkPassErrors(pass string) error {
	return nil
}

// use to generate keystore
func generateKeystore(pass string) error {
	cliPath := global.CLI_DIR_PATH + "/ela-cli"
	dataPath := global.KEYSTORE_DIR_PATH
	if err := os.MkdirAll(dataPath, perm.PUBLIC_WRITE); err != nil {
		return err
	}
	// step: exec cli
	cmd := exec.Command(cliPath,
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

func changeSystemPassword(pass string) error {
	stdinPass := "elabox:" + pass
	cmd := exec.Command("chpasswd")
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return err
	}
	go func() {
		defer stdin.Close()
		io.WriteString(stdin, stdinPass)
	}()
	_, err = cmd.CombinedOutput()
	if err != nil {
		return errors.New("failed setting up system password. " + err.Error())
	}
	return nil
}

func Setup(password string) error {
	if password == "" {
		logger.GetInstance().Debug().Msg("password setup skiped.")
		return nil
	}
	if err := checkPassErrors(password); err != nil {
		return err
	}
	if err := generateKeystore(password); err != nil {
		return err
	}
	if err := changeSystemPassword(password); err != nil {
		return err
	}
	return nil
}
