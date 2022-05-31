import usePasswordStore from "../store/password"
import useKeystoreStore from "../store/keystore"
import FinishedStyle from "../assets/css/finished.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import { useEffect } from "react"

export default function Finished(){
    const initPasswordSetup = usePasswordStore(state=>state.initSetup)
    const isPasswordSetup = usePasswordStore(state=>state.isSetup)    
    const download = useKeystoreStore(state=>state.download)
    const redirect = () => {
        window.location.href = window.location.origin
    }
    useEffect(()=>{
        initPasswordSetup()
        //eslint-disable-next-line
    },[])
    return <div className={FinishedStyle['app-finished']}>
        <h1>Congratulations, you're all setup!</h1>
        {isPasswordSetup && <div className={FinishedStyle['keystore']}>
            <p>The only way to recover your wallet in case of any issue is to keep <br /> securely your <b>keytore.dat</b> file and the <b>password</b> you just created</p>
            <button className={`btn btn-primary ${ButtonStyle['success']}`} onClick={download}>Download</button>
        </div> }
        <button 
            className={`btn btn-primary ${ButtonStyle['start']}`} 
            onClick={() => redirect()}>
                Start
        </button>
    </div>
}