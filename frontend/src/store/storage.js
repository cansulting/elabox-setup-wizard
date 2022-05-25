import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"

const useStorageStore = create(set => ({
    storages:[],
    storage: "",
    initSetup: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INIT_SETUP,"","storage").then(response => {
            if(response.code === 200){
                const {storage_list} = JSON.parse(response.message)
                set(_ =>({storages: storage_list}))                
            }
        })
        ElaboxEvent.on(constant.BROADCAST_STORAGE_CHANGED, args => {
            set(_ => ({storages:args.data}))
        })            
    },
    initDoneSetup : () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.INITDONE_SETUP,"","storage")
    },
    closeSetup: ()=>{
        ElaboxEvent.off(constant.BROADCAST_STORAGE_CHANGED)
    },
    selectStorage: (storage) => {
        set(_ => ({storage:storage.id}))
    }
}))

export default useStorageStore