package setup_keystore

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

func Setup(password string) error {
	return nil
}
