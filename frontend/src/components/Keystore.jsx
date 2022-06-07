import { useEffect } from "react"
import usePasswordStore from "../store/password"
import useKeystoreStore from "../store/keystore"
import KeyStoreStyle from "../assets/css/keystore.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default function Keystore({increaseSteps}){
    const initSetup = usePasswordStore(state=>state.initSetup)
    const download = useKeystoreStore(state=>state.download)    
    useEffect(()=>{
        initSetup()
        //eslint-disable-next-line
    },[])    
    const handleDownload = () =>{
        download()
        increaseSteps()
    }
    return <div className={KeyStoreStyle['app-keystore']}>
            <h1>Wallet created</h1>
            <p>The only way to recover your wallet in case of any issue is to keep securely your keytore.dat file and the password you just created</p>
            <button className={`btn btn-primary ${ButtonStyle['skip']}`} onClick={handleDownload}>
                Download
            </button>
        </div>            
}