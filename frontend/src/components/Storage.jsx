import Spinner from "./partials/Spinner"
import StorageStyle from "../assets/css/storage.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import useSetupStore from "../store/setUp"

export default function Storage({increaseSteps}){
    const isExternalStorageConnected = useSetupStore(state=>state.isExternalStorageConnected)
    const toggleExternalStorageConnected = useSetupStore(state => state.toggleExternalStorageConnected)
    return <div className={StorageStyle['app-storage']}>
        <h1>Connect External Storage</h1>
        <p>Expand your storage for data demanding nodes and services.</p>
        {!isExternalStorageConnected && <div>
            <Spinner/>
            <p>Waiting for storage to be connected</p>            
            </div>}
        <div className={`${ButtonStyle['group-flex-end']}`}>
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']}`} 
            onClick={increaseSteps}> Skip </button>
        </div>
    </div>
}