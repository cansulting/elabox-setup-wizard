import useDidStore  from "../store/did"
import DidStyle from "../assets/css/did.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default function Did({increaseSteps,decreaseSteps}){
    const did = useDidStore(state => state.did)
    const isProcessingDid = useDidStore(state => state.isProcessingDid)
    const processDid = useDidStore (state => state.processDid)    
    const processDidSignOut = useDidStore (state => state.processDidSignOut)
    const hasDid = did.holder?.length > 0
    const handleDidClick = () => {
        if(!isProcessingDid){
            processDid()
        }
    }
    const handleNextOrSkipClick = () =>{
        if(hasDid){
            increaseSteps(2)
            return;
        }
        processDidSignOut()
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
        className={`btn btn-secondary ${ButtonStyle['essentials']} ${hasDid ? ButtonStyle['success']:''}`} 
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
            className={`btn btn-primary ${ButtonStyle['skip']}`} 
            onClick={handleNextOrSkipClick}>
                {hasDid ? "Next":"Skip"}
            </button>            
        </div>
    </div>
}