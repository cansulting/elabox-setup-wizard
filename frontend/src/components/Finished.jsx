import { emptyCacheWithRedirect } from "../utils/cache"
import FinishedStyle from "../assets/css/finished.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default function Finished(){
    const redirect = () => {
        emptyCacheWithRedirect()
    }
    return <div className={FinishedStyle['app-finished']}>
        <h1>Congratulations, setup complete!</h1>
        <button 
            className={`btn btn-primary ${ButtonStyle['start']}`} 
            onClick={() => redirect()}>
                Start
        </button>
    </div>
}