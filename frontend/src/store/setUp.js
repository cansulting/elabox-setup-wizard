import create from "zustand";

const useSetupStore = create(set => ({
    isetUpCompleted:false,    
    isExternalStorageConnected:false,
    did:{},
    processSetUp: () => set(state => ({ isetUpCompleted: true })),
    processDid: ()=> set(state => ({ did: {id:"testing"} })),
    toggleExternalStorageConnected: () => set(state => ({ isExternalStorageConnected: true })),
}))

export default useSetupStore