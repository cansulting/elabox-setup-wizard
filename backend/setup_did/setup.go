package setup_did

import (
	"encoding/json"
	"errors"
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

func Setup(presentationStr string) error {
	presentationMap := make(map[string]interface{})
	if err := json.Unmarshal([]byte(presentationStr), presentationMap); err != nil {
		return errors.New("failed to decode Did presentation, " + err.Error())
	}
	if presentationMap["holder"] == nil || presentationMap["holder"] == "" {
		return errors.New("holder is not valid")
	}
	did := presentationMap["holder"].(string)
	println("recieved did " + did)
	return nil
}
