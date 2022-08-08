package setup_keystore

import (
	"elabox-setup/backend/global"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"

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

func CheckPassErrors(pass string) error {

	if pass == "" {
		return fmt.Errorf("password should not be blank")
	} else if len(pass) <= 5 {
		return fmt.Errorf("password should be at least 6 characters")
	} else if strings.ContainsAny(pass, " ") {
		return fmt.Errorf("password should not have space")
	} else if strings.ContainsAny(pass, "/[]'^$&()`{};:|\\,.<>]/") {
		return fmt.Errorf("password should not have special characters")
	}
	return nil

}

// use to generate keystore
func generateKeystore(pass string) error {
	logger.GetInstance().Debug().Msg("generating keystore")
	dir, _ := os.Getwd()
	cliPath := dir + "/ela-cli"
	if err := os.MkdirAll(global.KEYSTORE_DIR_PATH, perm.PUBLIC_WRITE); err != nil {
		return errors.New("unable to create dir, " + err.Error())
	}
	// step: exec cli
	cmd := exec.Command(cliPath,
		"wallet",
		"create",
		"-p",
		pass,
	)
	cmd.Dir = global.KEYSTORE_DIR_PATH
	contents, err := cmd.CombinedOutput()
	logger.GetInstance().Debug().Msg(string(contents))
	return err
}

func changeSystemPassword(pass string) error {
	logger.GetInstance().Debug().Msg("updating password")
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

func Setup(password string, skipkeystoregeneration bool) error {
	if password == "" {
		logger.GetInstance().Debug().Msg("password setup skiped.")
		return nil
	}
	if err := CheckPassErrors(password); err != nil {
		return err
	}
	if skipkeystoregeneration {
		logger.GetInstance().Debug().Msg("keystore generation skipped.")
	} else {
		if err := generateKeystore(password); err != nil {
			return errors.New("failed to generate keystore. " + err.Error())
		}
	}
	if err := changeSystemPassword(password); err != nil {
		return errors.New("failed changed system password, " + err.Error())
	}
	return nil
}
