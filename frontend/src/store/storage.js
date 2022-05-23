import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constants"
const useStorageStore = create(set => ({
    storages:[],
    storage: "",
    initStorageSetUp: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INIT_SETUP,"","storage")
        ElaboxEvent.on(constant.BROADCAST_STORAGE_CHANGED, args => {
            console.log(args.data)
            set(state => ({storages:args.data}))
        })
    },
    closeSetup: ()=>{
        ElaboxEvent.off(constant.BROADCAST_STORAGE_CHANGED)
    },
    selectStorage: (storage) => {
        set(state => ({storage:storage.id}))
    }
}))

export default useStorageStore