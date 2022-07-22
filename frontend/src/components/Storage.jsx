import { useEffect, useState } from "react"
import SetUpCompleted from "./partials/SetupCompleted"
import useStorageStore from "../store/storage"
import { formatBytes } from "../utils/sdcard"
import Spinner from "./partials/Spinner"
import StorageStyle from "../assets/css/storage.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import WarningModal from "./partials/modal/Warning"

export default function Storage({decreaseSteps,increaseSteps}){
    const [isOpenWarningModal,setIsOpenWarningModal] = useState(false)
    const storages = useStorageStore(state=>state.storages)
    const selectedStorage = useStorageStore(state=>state.storage)
    const initSetup = useStorageStore(state=>state.initSetup)
    const isSetup = useStorageStore(state=>state.isSetup)
    const initDoneSetup = useStorageStore(state=>state.initDoneSetup)
    const closeSetup = useStorageStore(state=>state.closeSetup)
    const selectStorage = useStorageStore(state=>state.selectStorage)
    const isExternalStorageConnected = storages.length > 0
    const hasSelectedStorage  = selectedStorage.length > 0
    const handleStorageChange = e =>{
        selectStorage(e.target.value)
    }
    const handlePrevClick = () => {
        decreaseSteps()
    }    
    const handleSkipOrNext = () =>{
        initDoneSetup()
        if(!hasSelectedStorage && !isSetup){
            setIsOpenWarningModal(true)
            return
        }
        increaseSteps()
    }
    const handleOnCloseWarningModal = () => {
        setIsOpenWarningModal(false)
    }
    const handleOnConfirmWarningModal = () =>{
        initDoneSetup()
        increaseSteps()
        setIsOpenWarningModal(false)
    }
    useEffect(()=>{
        initSetup()
        return () =>{
            closeSetup()
        }
        // eslint-disable-next-line
    },[])
    if(isSetup === ""){
        return <Spinner/>
    }    
    return <div className={StorageStyle['app-storage']}>
        <WarningModal 
            isOpen={isOpenWarningModal} 
            message={"No external storage was selected. Some of dApps will use extra space to download blockchain data."}
            onClose={handleOnCloseWarningModal}
            onConfirm={handleOnConfirmWarningModal}
        />
        <h1>Connect External Storage</h1>
            <p>Expand your storage for data demanding nodes and services.</p>
        {isSetup ? 
        <>
            <SetUpCompleted/>
        </>:<>
            {!isExternalStorageConnected ? <div>
                <Spinner/>
                <p>Waiting for storage to be connected</p>            
                </div> : <select className={StorageStyle['storages']} value={selectedStorage} onChange={handleStorageChange}> 
                    <option value={""}>Select Storage</option>
                    {storages.map(storage=><option key={storage.id} value={storage.id}>
                        {storage.model} ({formatBytes(storage.size)})
                    </option>)}    
                </select>}        
        </>}
        <div className={`${ButtonStyle['group']}`}>
            <button 
            className={`btn btn-primary ${ButtonStyle['prev']}`} 
            onClick={handlePrevClick}>
                Previous
            </button>            
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']}`} 
            onClick={handleSkipOrNext}>
                {hasSelectedStorage ? "Next":"Skip"} 
            </button>
        </div>
    </div>
}