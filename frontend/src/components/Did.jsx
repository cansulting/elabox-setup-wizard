import DidStyle from "../assets/css/did.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import useStepsStore from "../store/steps"

export default function Did(){
    const decreaseSteps = useStepsStore(state => state.decreaseSteps)
    const increaseSteps = useStepsStore(state => state.increaseSteps)
    return <div className={DidStyle['app-did']}>
        <h1>Sign-in with DID</h1>
        <p>
            This allows you to connect to DID network and own your data. 
            <br/>
            With DIDs you can share with any DApps.    
        </p>
        <button className={`btn btn-secondary ${ButtonStyle['essentials']}`}>Connect Essentials</button>
        <div className={ButtonStyle['group']}>
            <button className={`btn btn-primary ${ButtonStyle['prev']}`} onClick={decreaseSteps}>Previous</button>
            <button className={`btn btn-primary ${ButtonStyle['skip']}`} onClick={increaseSteps}>Skip</button>            
        </div>
    </div>
}