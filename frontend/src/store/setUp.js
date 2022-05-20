import create from "zustand";
const useSetupStore = create(set => ({
    isetUpCompleted:false,    
    isProcessingDid:false,
    isExternalStorageConnected:false,
    did:{},
    processSetUp: () => set(state => ({ isetUpCompleted: true })),
    processDid: async ()=> {
        set(state => ({ isProcessingDid: true }));
        const {DIDAuth} = await import("../utils/did")
        const DidAuth = new DIDAuth()   
        const presentation = await DidAuth.signIn()
        const result = presentation.toJSON()
        set(state => ({ isProcessingDid:false,did: result }))
    },
    toggleExternalStorageConnected: () => set(state => ({ isExternalStorageConnected: true })),
}))

export default useSetupStore