import create from "zustand";
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constants"

const useDidStore = create(set => ({
    did: {},
    isProcessingDid: false,
    initSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INIT_SETUP,"","did")
    },
    initDoneSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INITDONE_SETUP,"","did")
    },
    closeSetup: ()=> {
        ElaboxEvent.off(constant.BROADCAST_STORAGE_CHANGED)
    },
    processDid: async ()=> {
        try {
            set(_ => ({ isProcessingDid: true }));            
            const {DIDAuth} = await import("../utils/did")
            const DidAuth = new DIDAuth()   
            const presentation = await DidAuth.signIn()
            const result = presentation.toJSON()
            set(_ => ({ did: result }))            
        } catch (error) {
            set(_ => ({ did: {} }))                        
        } finally{
            set(_ => ({ isProcessingDid: false }))
        }
    },
    signOut: async () =>{
        set(_ => ({ did: {},isProcessingDid:false }))            
    },    
}))

export default useDidStore