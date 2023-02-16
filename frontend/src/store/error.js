import create from "zustand"
import {NotificationManager} from 'react-notifications';
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"

const useErrorStore = create((set, get) => ({
    hasError:false,
    message: "",
    initSetup: () =>{
        ElaboxEvent.on(constant.BROADCAST_ERROR, args =>{
            const {code,error} = JSON.parse(args.data)
            if(code === constant.DOWNLOAD_FILE_ERROR_CODE ){
                NotificationManager.error(error)
             return   
            }         
            get().toggleError(error)   
            //set({hasError:true,message:error})
        })              
    },
    toggleWarning: (message,duration = 3000) => {
       NotificationManager.warning(message,"",duration)
    },
    toggleError : (message)=>{
        console.error("setup failed", message)
        set(_=> ({ hasError: true, message }))        
    },
}))

export default useErrorStore