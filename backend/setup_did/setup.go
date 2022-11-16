package setup_did

import (
	"elabox-setup/backend/global"
	"encoding/json"
	"errors"

	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

// return true if already setup
func Init() bool {
	return WasSetup()
}

func InitDone() {

}

// return true if already setup
func WasSetup() bool {
	res, err := global.Controller.RPC.CallRPC(global.ACCOUNT_PACKAGE_ID, data.NewActionById(global.CHECK_DID_SETUP))
	if err != nil {
		logger.GetInstance().Error().Err(err).Msg("failed checking DID account")
		return false
	}
	result, err := res.ToSimpleResponse()
	if result.Code != rpc.SUCCESS_CODE || err != nil {
		logger.GetInstance().Error().Err(err).Msg(result.Message)
		return false
	}
	return result.Message == "setup"
}

func Setup(presentationStr string) error {
	if presentationStr == "" {
		logger.GetInstance().Debug().Msg("did setup was skipped, empty presentation was passed.")
		return nil
	}
	presentationMap := make(map[string]interface{})
	// step: read did from presentation param
	if err := json.Unmarshal([]byte(presentationStr), &presentationMap); err != nil {
		return errors.New("failed to decode Did presentation, " + err.Error())
	}
	if presentationMap["holder"] == nil || presentationMap["holder"] == "" {
		return errors.New("holder is not valid")
	}

	datadid := make(map[string]interface{})
	datadid["presentation"] = presentationMap
	res, err := global.Controller.RPC.CallRPC(
		global.ACCOUNT_PACKAGE_ID,
		data.NewAction(global.SETUP_DID, "", datadid),
	)
	if err != nil {
		return errors.New("failed to request setup did, " + err.Error())
	}
	resSim, err := res.ToSimpleResponse()
	if err == nil && resSim.Code != rpc.SUCCESS_CODE {
		return errors.New("failed to request setup did, " + resSim.Message)
	}
	return nil
}
