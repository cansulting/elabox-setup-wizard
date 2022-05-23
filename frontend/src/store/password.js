import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"
const usePasswordStore = create(set =>({
    password:"",
    initSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INIT_SETUP,"","password")
    },
    initDoneSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INITDONE_SETUP,"","password")
    },    
    closeSetup: ()=> {
    },   
    setPassword: password => {
        set(_=>({password}))
    } 
}))

export default usePasswordStore