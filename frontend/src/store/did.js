import create from "zustand";

const useDidStore = create(set => ({
    did: {},
    isProcessingDid: false,
    processDid: async ()=> {
        try {
            set(state => ({ isProcessingDid: true }));            
            const {DIDAuth} = await import("../utils/did")
            const DidAuth = new DIDAuth()   
            const presentation = await DidAuth.signIn()
            const result = presentation.toJSON()
            set(state => ({ did: result }))            
        } catch (error) {
            set(state => ({ did: {} }))                        
        } finally{
            set(state => ({ isProcessingDid: false }))
        }
    },
    processDidSignOut: async () =>{
        set(state => ({ did: {},isProcessingDid:false }))            
    },    
}))

export default useDidStore