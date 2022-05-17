package global

import "github.com/cansulting/elabox-system-tools/foundation/app"

var Controller *app.Controller

// actions
const INIT_SETUP = "setup.actions.INIT"
const INITDONE_SETUP = "setup.actions.INIT_DONE"
const START_SETUP = "setup.actions.START"

// setup id
const DID = "did"
const STORAGE = "storage"
const PASSWORD = "password"
