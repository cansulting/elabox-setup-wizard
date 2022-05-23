import ErrorStyle from "../assets/css/error.module.css"
import useErrorStore from "../store/error"

export default function Error(){
    const message = useErrorStore(state=>state.message)
    const handleTryAgain = () =>{
        window.location.reload()
    }
    return <div className={ErrorStyle['app-error']}>
        <h1>Error occured.</h1>
        <p>{message}</p>
        <button className="btn btn-primary" onClick={handleTryAgain}> try again </button>
    </div>
}