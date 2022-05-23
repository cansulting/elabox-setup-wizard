import create from "zustand";
import ElaboxEvent from "../utils/ElaboxEvent";
import * as constant from "../utils/constants"

const useErrorStore = create(set => ({
    hasError:false,
    initSetup: () =>{
        ElaboxEvent.subscribe(constant.PACKAGE_ID,_=>{
            ElaboxEvent.on(constant.USB_LOOKUP_ERR, _ =>{
                this.toggleError()
            })        
            ElaboxEvent.on(constant.BROADCAST_ERROR, _ =>{
                this.toggleError()
            })                    
        })
    },
    toggleError : ()=> set((state) => ({ hasError: true })),
}))

export default useErrorStore