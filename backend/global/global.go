package global

import (
	"github.com/cansulting/elabox-system-tools/foundation/app"
	"github.com/cansulting/elabox-system-tools/foundation/path"
)

var Controller *app.Controller

const DEFAULT_USERNAME = "elabox"
const DEFAULT_PASSWORD = DEFAULT_USERNAME

const ACCOUNT_PACKAGE_ID = "ela.account"
const PACKAGE_ID = "ela.setup"
const HOME_DIR = "/home/elabox"
const DID_HASH_PATH = HOME_DIR + "/data/ela.account/did.dat"
const DID_DATA_DIR = HOME_DIR + "/data/ela.account"

var CLI_DIR_PATH = path.GetSystemAppDir() + "/" + PACKAGE_ID

const KEYSTORE_DIR_PATH = HOME_DIR + "/documents/ela.mainchain"
const OLD_KEYSTORE_DIR_PATH = HOME_DIR + "/data/ela.mainchain" // for old version of keystore
const KEYSTORE_FILENAME = "keystore.dat"
const TMP_DIR = "/home/tmp"

// actions
const INIT_SETUP = "setup.actions.INIT"          // initialize setup
const INITDONE_SETUP = "setup.actions.INIT_DONE" // done initialize
const START_SETUP = "setup.actions.START"        // start the setup
const CHECK_SETUP = "setup.actions.CHECK_STATUS" // use to check is device setup status
const SETUP_DID = "account.actions.DID_SETUP"

// broadcast actions
const BROADCAST_STORAGE_CHANGED = "setup.broadcast.STORAGE_CHANGED" // broadcast when storage list changed
const BROADCAST_ERROR = "setup.broadcast.SETUP_ERROR"               // broadcast when recieved an error
const BROADCAST_SUCCESS = "setup.broadcast.SETUP_SUCCESS"
const SYSTEM_CONFIGURED = "ela.system.CONFIGURED" // mark the system as configured

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

//info
const INFO_PATH = "/info.json"
const GET_INFO = "GET_INFO"
const READING_INFO_FILE_ERROR_CODE = 202

// download
const DOWNLOAD_KEYSTORE = "DOWNLOAD_KEYSTORE"

const DOWNLOAD_FILE_ERROR_CODE = 201
