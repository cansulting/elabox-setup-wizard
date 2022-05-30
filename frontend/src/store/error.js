import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"

const useErrorStore = create((set) => ({
    hasError:false,
    message: "",
    initSetup: () =>{
        ElaboxEvent.on(constant.USB_LOOKUP_ERR, args =>{
            const {error} = JSON.parse(args.data)
            set({hasError:true,message:error})
        })        
        ElaboxEvent.on(constant.BROADCAST_ERROR, args =>{
            const {error} = JSON.parse(args.data)
            set({hasError:true,message:error})
        })              
        ElaboxEvent.on(constant.INVALID_CODE,args => {
            const {error} = JSON.parse(args.data)
            set({hasError:true,message:error})
        })      
    },
    toggleError : (message)=> set(_=> ({ hasError: true, message })),
}))

export default useErrorStore