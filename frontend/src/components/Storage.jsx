import { useEffect } from "react"
import useStorageStore from "../store/storage"
import Spinner from "./partials/Spinner"
import StorageStyle from "../assets/css/storage.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default function Storage({increaseSteps}){
    const storages = useStorageStore(state=>state.storages)
    const selectedStorage = useStorageStore(state=>state.storage)
    const initStorageSetUp = useStorageStore(state=>state.initStorageSetUp)
    const closeSetup = useStorageStore(state=>state.closeSetup)
    const selectStorage = useStorageStore(state=>state.selectStorage)
    const isExternalStorageConnected = storages.length > 0
    useEffect(()=>{
        initStorageSetUp()
        return () =>{
            closeSetup()
        }
    },[initStorageSetUp,closeSetup])
    return <div className={StorageStyle['app-storage']}>
        <h1>Connect External Storage</h1>
        <p>Expand your storage for data demanding nodes and services.</p>
        {!isExternalStorageConnected ? <div>
            <Spinner/>
            <p>Waiting for storage to be connected</p>            
            </div> : <div className={StorageStyle['storages']}> 
                {storages.map(storage=><button 
                className={`btn btn-primary  ${storage.id === selectedStorage ? ButtonStyle['success']:''}`} key={storage.id} 
                onClick={()=>selectStorage(storage)}>
                    {storage.model} ({storage.size})
                </button>)}    
            </div>}
        <div className={`${ButtonStyle['group-flex-end']}`}>
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']}`} 
            onClick={increaseSteps}> Skip </button>
        </div>
    </div>
}