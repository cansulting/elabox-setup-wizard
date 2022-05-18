package utils

import (
	"os/exec"
	"strings"

	"github.com/cansulting/elabox-system-tools/foundation/errors"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

func RunBash(bash string, dir string) error {
	sep := strings.Split(bash, " ")
	var cmd *exec.Cmd
	if len(sep) > 1 {
		cmd = exec.Command(sep[0], sep[1:]...)
	} else {
		cmd = exec.Command(sep[0])
	}
	cmd.Dir = dir
	contents, err := cmd.CombinedOutput()
	logger.GetInstance().Debug().Msg(string(contents))
	if err != nil {
		return errors.SystemNew("failed to run command "+bash, err)
	}
	return nil
}
