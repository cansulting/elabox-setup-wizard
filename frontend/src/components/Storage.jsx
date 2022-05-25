import { useEffect } from "react"
import useStorageStore from "../store/storage"
import Spinner from "./partials/Spinner"
import StorageStyle from "../assets/css/storage.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default function Storage({increaseSteps}){
    const storages = useStorageStore(state=>state.storages)
    const selectedStorage = useStorageStore(state=>state.storage)
    const initSetup = useStorageStore(state=>state.initSetup)
    const initDoneSetup = useStorageStore(state=>state.initDoneSetup)
    const closeSetup = useStorageStore(state=>state.closeSetup)
    const selectStorage = useStorageStore(state=>state.selectStorage)
    const isExternalStorageConnected = storages.length > 0
    const hasSelectedStorage  = selectedStorage.length > 0
    const handleStorageChange = e =>{
        selectStorage(e.target.value)
    }
    useEffect(()=>{
        setTimeout(()=>{
            initSetup()
        },2000)
        return () =>{
            closeSetup()
        }
        // eslint-disable-next-line
    },[])
    return <div className={StorageStyle['app-storage']}>
        <h1>Connect External Storage</h1>
        <p>Expand your storage for data demanding nodes and services.</p>
        {!isExternalStorageConnected ? <div>
            <Spinner/>
            <p>Waiting for storage to be connected</p>            
            </div> : <select className={StorageStyle['storages']} onChange={handleStorageChange}> 
                <option value=""/>
                {storages.map(storage=><option key={storage.id} value={storage.id}>
                    {storage.model} ({storage.size})
                </option>)}    
            </select>}
        <div className={`${ButtonStyle['group-flex-end']}`}>
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']}`} 
            onClick={()=>{
                initDoneSetup()
                increaseSteps()
            }}>
                {hasSelectedStorage ? "Next":"Skip"} 
            </button>
        </div>
    </div>
}