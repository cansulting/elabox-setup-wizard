import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"
const usePasswordStore = create(set =>({
    password:"",
    isSetup:"",
    initSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INIT_SETUP,"","password").then(response => {
            if(response.code === 200){
                set(_ =>({isSetup:response.message === "setup"}))                
            }
        })
    },
    initDoneSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INITDONE_SETUP,"","password")
    },    
    closeSetup: ()=> {
        set(_=>({isSetup:""}))
    },   
    setPassword: password => {
        set(_=>({password}))
    } 
}))

export default usePasswordStore