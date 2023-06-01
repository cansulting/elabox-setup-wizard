package setup_useracc

import (
	"elabox-setup/backend/global"
	"errors"

	"github.com/cansulting/elabox-system-tools/foundation/event/data"
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
	return system.IsConfig()
}

func Setup(presentationStr string, password string) error {
	callParams := make(map[string]interface{})
	callParams["pass"] = password
	callParams["presentation"] = presentationStr
	res, _ := global.Controller.RPC.CallRPC(
		global.ACCOUNT_PACKAGE_ID,
		data.NewAction(global.USER_ACCOUNT_SETUP, "", callParams))
	if res == nil {
		return errors.New("failed call user account service")
	}
	sres, _ := res.ToSimpleResponse()
	if !sres.IsSuccess() {
		return errors.New(sres.Message)
	}
	return nil
}
