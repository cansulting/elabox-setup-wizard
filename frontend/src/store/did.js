import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"
import Did  from "../utils/did"

const useDidStore = create(set => ({
    did: "",
    isSetup: "",
    isProcessingDid: false,
    initSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INIT_SETUP,"","did").then(response => {
            if(response.code === 200){
                set(_ =>({isSetup:response.message === "setup"}))                
            }
        })
    },
    initDoneSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INITDONE_SETUP,"","did")
    },
    closeSetup: ()=> {
        set(_=>({isSetup:""}))
        ElaboxEvent.off(constant.BROADCAST_STORAGE_CHANGED)
    },
    processDid: async ()=> {
        set(_ => ({ isProcessingDid: true, did: "" }));  
        try {
            const presentation = await Did.getInstance().request()
            if (presentation ) {
                const result = presentation.toString()
                set(_ => ({ did: result }))
            }            
        } catch (err) {
            console.log("Error did", err)               
        } 
        set(_ => ({ isProcessingDid: false }))
    },
    signOut: async () =>{
        set(_ => ({ did: "",isProcessingDid:false }))            
    },    
}))

export default useDidStore