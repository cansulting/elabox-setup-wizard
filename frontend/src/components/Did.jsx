import { useEffect } from "react"
import Spinner from "./partials/Spinner"
import useDidStore from "../store/did"
import DidStyle from "../assets/css/did.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import SetUpCompleted from "./partials/SetupCompleted"
import { isKeystoreWillBeGenerated } from "../utils/config"
import useErrorStore from "../store/error"
import useWalletStore from "../store/wallet"

export default function Did({increaseSteps,decreaseSteps}){
    const did = useDidStore(state => state.did)
    const walletConnector = useDidStore(state => state.walletConnector)
    const isProcessingDid = useDidStore(state => state.isProcessingDid)
    const initSetup = useDidStore(state => state.initSetup)
    const isSetup = useDidStore(state => state.isSetup)
    const initDoneSetup = useDidStore(state => state.initDoneSetup)
    const closeSetup = useDidStore(state => state.closeSetup)
    const processDid = useDidStore (state => state.processDid)    
    const signOut = useDidStore (state => state.signOut)
    const setWallet = useWalletStore(state => state.setWallet)
    const toggleWarning = useErrorStore(state => state.toggleWarning)
    const hasDid = did.length > 0
    const handleDidClick = () => {
        if(!isProcessingDid){
            if(!hasDid){
                processDid()
            }
            else if(hasDid){
                signOut()
            }
        }
    }
    const handleNextOrSkipClick = () =>{
        increaseSteps()   
        if(hasDid){
            initDoneSetup()              
            return;
        }
        signOut()
    }
    useEffect(() => {
        initSetup()
        return () => {
            closeSetup()
        }
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if (!isKeystoreWillBeGenerated && hasDid) {
            if(walletConnector.chainId !== 20){
                toggleWarning("Wrong network, only Elastos Smart Chain is supported.")
                signOut()
            }
            else{
                alert(walletConnector.accounts[0])
                setWallet(walletConnector.accounts[0])
            }
        }    
        // eslint-disable-next-line            
    },[hasDid])
    if(isSetup === ""){
        return <Spinner/>
    }    
    return <div className={DidStyle['app-did']}>
        <h1>Sign-in with DID</h1>
        <p>
            This allows you to connect to DID network and own your data. 
            <br/>
            With DIDs you can share with any DApps.    
        </p>
        {isSetup ? 
        <>
            <SetUpCompleted/>
        </>:
        <>
            <button 
            className={`btn btn-secondary ${ButtonStyle['essentials']} ${hasDid ? ButtonStyle['success']:''}`} 
            onClick={handleDidClick}>
                {isProcessingDid && "Open your essentials to confirm your DID"}
                {hasDid && !isProcessingDid && "Disconnect"}
                {!hasDid && !isProcessingDid && "Connect Essentials"}
            </button>        
        </>}
        <div className={ButtonStyle['group']}>
            <button 
            className={`btn btn-primary ${ButtonStyle['prev']}`} 
            onClick={decreaseSteps}>
                Previous
            </button>
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']}`} 
            onClick={handleNextOrSkipClick}>
                {hasDid || isSetup ? "Next":"Skip"}
            </button>            
        </div>
    </div>
}