import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from  "../utils/constant"

export const activateElabox = async (did)=>{ 
    const res = await ElaboxEvent.sendRPC(constant.rewards, constant.REGISTERDEVICE_ACTION, "",{did: did})
    if (res.code !== 200) 
        throw res
    return true
}
export const isElaboxActivated = async ()=>{
    const res = await ElaboxEvent.sendRPC(constant.rewards, constant.CHECK_DEVICE_ACTION)
    //console.log("isactivated", res)
    if (res.code !== 200) 
        throw res
    let activated = true
    if (res.message !== "registered")
        activated = false
    return activated
}