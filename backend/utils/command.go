package utils

import (
	"os/exec"
	"strings"

	"github.com/cansulting/elabox-system-tools/foundation/errors"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

func RunBashFile(bash string, dir string) error {
	sep := strings.Split(bash, " ")
	var cmd *exec.Cmd
	cmd = exec.Command("/bin/bash", sep[:]...)
	cmd.Dir = dir
	contents, err := cmd.CombinedOutput()
	logger.GetInstance().Debug().Msg(string(contents))
	if err != nil {
		return errors.SystemNew("failed to run command "+bash, err)
	}
	return nil
}

func RunBashStmt(statement string, dir string) (string, error) {
	cmd := exec.Command("bash", "-c", statement)
	cmd.Dir = dir
	contents, err := cmd.CombinedOutput()
	logger.GetInstance().Debug().Msg(string(contents))
	if err != nil {
		return string(contents), errors.SystemNew("failed to run command "+statement, err)
	}
	return string(contents), nil
}
