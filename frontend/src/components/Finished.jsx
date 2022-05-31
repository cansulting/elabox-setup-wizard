import FinishedStyle from "../assets/css/finished.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default function Finished(){
    const redirect = () => {
        window.location.href = window.location.origin
    }
    return <div className={FinishedStyle['app-finished']}>
        <h1>Congratulations, you're all setup!</h1>
        <button 
            className={`btn btn-primary ${ButtonStyle['start']}`} 
            onClick={() => redirect()}>
                Start
        </button>
    </div>
}