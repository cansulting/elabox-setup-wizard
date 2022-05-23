import create from "zustand"
import * as constant from "../utils/constant"
import ElaboxEvent from "../utils/ElaboxEvent"

const useSetupStore = create(set => ({
    isetUpCompleted:false,    
    initSetup: () =>{
        ElaboxEvent.subscribe(constant.PACKAGE_ID,(args) => {
        })
        ElaboxEvent.on(constant.CHECK_SETUP,(args) => {
            console.log(args)
        })                    
    },
    processSetUp: data => {
        console.log(data)        
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.START_SETUP,"",JSON.stringify(data))
    },
}))

export default useSetupStore