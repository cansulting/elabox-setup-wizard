import create from "zustand";


const useSetupStore = create(set => ({
    isetUpCompleted:false,    
    isExternalStorageConnected:false,
    processSetUp: () => set(state => ({ isetUpCompleted: true })),
    toggleExternalStorageConnected: () => set(state => ({ isExternalStorageConnected: true })),
}))

export default useSetupStore