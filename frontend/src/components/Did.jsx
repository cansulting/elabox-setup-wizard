import { useTransition } from "react"
import useSetupStore  from "../store/setUp"
import DidStyle from "../assets/css/did.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default function Did({increaseSteps,decreaseSteps}){
    const [pending,setTransition] = useTransition()
    const did = useSetupStore(state => state.did)
    const isProcessingDid = useSetupStore(state => state.isProcessingDid)
    const processDid = useSetupStore (state => state.processDid)    
    const hasDid = did.holder?.length > 0
    const handleDidClick = () => {
        if(!isProcessingDid){
            setTransition(()=>{
                processDid()
            })
        }
    }
    const handleNextOrSkipClick = () =>{
        if(hasDid){
            increaseSteps()
            increaseSteps()
            return;
        }
        increaseSteps()
    }
    return <div className={DidStyle['app-did']}>
        <h1>Sign-in with DID</h1>
        <p>
            This allows you to connect to DID network and own your data. 
            <br/>
            With DIDs you can share with any DApps.    
        </p>
        <button 
        className={`btn btn-secondary ${ButtonStyle['essentials']} ${hasDid ? ButtonStyle['disabled']:''}`} 
        disabled={hasDid}
        onClick={handleDidClick}>
            {isProcessingDid && "Open your essentials to confirm your DID"}
            {hasDid && !isProcessingDid && "Connected"}
            {!hasDid && !isProcessingDid && "Connect Essentials"}
        </button>
        <div className={ButtonStyle['group']}>
            <button 
            className={`btn btn-primary ${ButtonStyle['prev']}`} 
            onClick={decreaseSteps}>
                Previous
            </button>
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']} ${pending ? ButtonStyle['disabled']:''}`} 
            disabled={pending}
            onClick={handleNextOrSkipClick}>
                {hasDid ? "Next":"Skip"}
            </button>            
        </div>
    </div>
}