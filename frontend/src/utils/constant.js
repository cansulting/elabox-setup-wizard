export const PACKAGE_ID = "ela.setup"
export const INIT_SETUP = "setup.actions.INIT"          // initialize setup
export const INITDONE_SETUP = "setup.actions.INIT_DONE" // done initialize
export const START_SETUP = "setup.actions.START"        // start the setup
export const CHECK_SETUP = "setup.actions.CHECK_STATUS" // use to check is device setup status

// broadcast actions
export const BROADCAST_STORAGE_CHANGED = "setup.broadcast.STORAGE_CHANGED" // broadcast when storage list changed
export const BROADCAST_ERROR = "setup.broadcast.SETUP_ERROR"               // broadcast when recieved an error
export const BROADCAST_SUCCESS = "setup.broadcast.SETUP_SUCCESS"

// setup id
export const DID = "did"
export const STORAGE = "storage"
export const PASSWORD = "password"

// ERROR
export const USB_LOOKUP_ERR = 101 // issue found while searching for usb

export const SUCCESS_CODE = 200
export const SYSTEMERR_CODE = 400 // theres something wrong with the system
export const INVALID_CODE = 401
export const NOT_IMPLEMENTED = 300 // code was not implemented
export const DOWNLOAD_FILE_ERROR_CODE = 201

//download
export const DOWNLOAD_KEYSTORE = "DOWNLOAD_KEYSTORE"

//info
export const GET_INFO = "GET_INFO"