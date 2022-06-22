import * as licenseActions from "../actions/license"
import DID from "./did"

// return true or false if activated
export const isActivated = async () => {
    const res = await licenseActions.isElaboxActivated()
    //console.log(res)
    return res
}

export const activateLicense = async () => {
    const did = await DID.getInstance().request()
    //const did = "asdfsadf"
    if (did && did.holder) {
        const holder = did.holder.toJSON()
        const res = await licenseActions.activateElabox(holder)
        return res 
    } 
    return null
}