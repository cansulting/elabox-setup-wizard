package global

import "github.com/cansulting/elabox-system-tools/foundation/app"

var Controller *app.Controller

const PACKAGE_ID = "ela.setup"
const HOME_DIR = "/home/elabox"
const DID_HASH_PATH = HOME_DIR + "/data/" + PACKAGE_ID + "/did.dat"
const DID_DATA_DIR = HOME_DIR + "/data/" + PACKAGE_ID

const CLI_DIR_PATH = HOME_DIR + "/apps/ela.mainchain"
const KEYSTORE_DIR_PATH = HOME_DIR + "/documents/ela.mainchain"
const OLD_KEYSTORE_DIR_PATH = HOME_DIR + "/data/ela.mainchain" // for old version of keystore
const KEYSTORE_FILENAME = "keystore.dat"

// actions
const INIT_SETUP = "setup.actions.INIT"          // initialize setup
const INITDONE_SETUP = "setup.actions.INIT_DONE" // done initialize
const START_SETUP = "setup.actions.START"        // start the setup
const CHECK_SETUP = "setup.actions.CHECK_STATUS" // use to check is device setup status

// broadcast actions
const BROADCAST_STORAGE_CHANGED = "setup.broadcast.STORAGE_CHANGED" // broadcast when storage list changed
const BROADCAST_ERROR = "setup.broadcast.SETUP_ERROR"               // broadcast when recieved an error
const BROADCAST_SUCCESS = "setup.broadcast.SETUP_SUCCESS"

// setup id
const DID = "did"
const STORAGE = "storage"
const PASSWORD = "password"

// ERROR
const USB_LOOKUP_ERR = 101 // issue found while searching for usb

// keystore
const documents = "/home/elabox/documents"
const documentsMainchain = documents + "/ela.mainchain"
const KEYSTORE_PATH = documentsMainchain + "/keystore.dat"

// download
const DOWNLOAD_KEYSTORE = "DOWNLOAD_KEYSTORE"
