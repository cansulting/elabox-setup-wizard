package setup_usb

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

func Setup(willSetup bool) error {
	return nil
}
