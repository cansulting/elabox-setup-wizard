import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"

const useErrorStore = create((set) => ({
    hasError:false,
    message: "",
    initSetup: () =>{
        ElaboxEvent.on(constant.USB_LOOKUP_ERR, args =>{
            set({hasError:true,message: args.data})
        })        
        ElaboxEvent.on(constant.BROADCAST_ERROR, args =>{
            set({hasError:true,message: args.data})
        })              
        ElaboxEvent.on(constant.INVALID_CODE,args => {
            set({hasError:true,message: args.data})
        })      
    },
    z : (message)=> set(_=> ({ hasError: true,message })),
}))

export default useErrorStore