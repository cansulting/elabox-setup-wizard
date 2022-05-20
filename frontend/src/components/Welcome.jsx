import WelcomeStyle from "../assets/css/welcome.module.css"
import ButtonStyle from "../assets/css/button.module.css"
export default function Welcome({increaseSteps}){
    return <div className={WelcomeStyle['app-welcome']}>
        <h1>Welcome to Elabox</h1>
        <p>
            The most secure way to access Web3 
            <br/> 
            And keep your digital assets secure
        </p>
        <button className={`btn btn-primary ${ButtonStyle['setup']}`} onClick={increaseSteps}>Setup</button>
    </div>
}