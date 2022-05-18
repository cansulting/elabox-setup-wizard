package global

import "github.com/cansulting/elabox-system-tools/foundation/app"

var Controller *app.Controller

const PACKAGE_ID = "ela.setup"
const HOME_DIR = "/home/elabox"

// actions
const INIT_SETUP = "setup.actions.INIT"          // initialize setup
const INITDONE_SETUP = "setup.actions.INIT_DONE" // done initialize
const START_SETUP = "setup.actions.START"        // start the setup
const CHECK_SETUP = "setup.actions.CHECK_SETUP"  // use to check is device was setup or not

// broadcast actions
const BROADCAST_STORAGE_CHANGED = "setup.broadcast.STORAGE_CHANGED" // broadcast when storage list changed
const BROADCAST_ERROR = "setup.broadcast.ERROR"                     // broadcast when recieved an error

// setup id
const DID = "did"
const STORAGE = "storage"
const PASSWORD = "password"

// ERROR
const USB_LOOKUP_ERR = 101 // issue found while searching for usb
