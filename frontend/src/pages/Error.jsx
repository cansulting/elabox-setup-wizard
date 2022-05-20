import ErrorStyle from "../assets/css/error.module.css"
import Logo from "../components/partials/Logo"

export default function Error(){
    const handleTryAgain = () =>{
        window.location.reload()
    }
    return <div className={ErrorStyle['app-error']}>
        <h1>Error occured.</h1>
        <Logo/>
        <button className="btn btn-primary" onClick={handleTryAgain}> try again </button>
    </div>
}