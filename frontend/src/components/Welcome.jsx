import { isActivated } from '../utils/license'
import WelcomeStyle from "../assets/css/welcome.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import useSetupStore from "../store/setUp"
export default function Welcome({increaseSteps}){
    const isSubscribe = useSetupStore(state=>state.isSubscribe)
    const handleNextClick = async () =>{
        const res = await isActivated()
        if(res) {
            increaseSteps(2)
            return
        }
        increaseSteps()
    }
    return <div className={WelcomeStyle['app-welcome']}>
        <h1>Welcome to Elabox</h1>
        <p>
            The most secure way to access Web3 
            <br/> 
            And keep your digital assets secure
        </p>
        <button 
        className={`btn ${ButtonStyle['setup']} ${isSubscribe ? 'btn-primary':ButtonStyle['disabled']}`} 
        disabled={!isSubscribe} onClick={handleNextClick}>
            Setup
        </button>
    </div>
}