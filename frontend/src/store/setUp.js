import create from "zustand"
import * as constant from "../utils/constant"
import ElaboxEvent from "../utils/ElaboxEvent"

const useSetupStore = create(set => ({
    isetUpCompleted:false,    
    isSubscribe:false,
    setupStatus: "unknown", // can be setup, setting_up, upsetup 
    initSetup: () =>{
        set( state => {
            if (state.setupStatus !== "unknown") return
            ElaboxEvent.subscribe(constant.PACKAGE_ID,(args) => {
                set(state=>({isSubscribe:true}))
            })
            ElaboxEvent.sendRPC(constant.PACKAGE_ID, constant.CHECK_SETUP)
                .then( res => set( _ => ({setupStatus:res.message})))    
            ElaboxEvent.onAction(
                constant.BROADCAST_SUCCESS, 
                (_) => set(_ => {
                    console.log("SUCCESS")
                    return {setupStatus:"setup"}
                }))
            return {setupStatus:"..."}    
        })
                    
    },
    processSetUp: data => {
        console.log("PROCESS SETUP")
        return ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.START_SETUP,"",data)
    },
    startSetup: () => {
        set( _ => ({setupStatus: "setting_up"}))
    }
}))

export default useSetupStore