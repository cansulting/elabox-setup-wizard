import create from "zustand"
import * as constant from "../utils/constant"
import ElaboxEvent from "../utils/ElaboxEvent"

const useSetupStore = create(set => ({
    isetUpCompleted:false,    
    isSubscribe:false,
    initSetup: () =>{
        ElaboxEvent.subscribe(constant.PACKAGE_ID,(args) => {
            set(state=>({isSubscribe:true}))
        })
        ElaboxEvent.on(constant.CHECK_SETUP,(args) => {
            console.log(args)
        })                    
    },
    processSetUp: data => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.START_SETUP,"",data)
    },
}))

export default useSetupStore