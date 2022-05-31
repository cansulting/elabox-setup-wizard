import create from "zustand"
import {NotificationManager} from 'react-notifications';
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
            if(args.id === constant.DOWNLOAD_FILE_ERROR_CODE ){
                NotificationManager.error(error)
             return   
            }            
            set({hasError:true,message:error})
        })              
    },
    toggleError : (message)=> set(_=> ({ hasError: true, message })),
}))

export default useErrorStore