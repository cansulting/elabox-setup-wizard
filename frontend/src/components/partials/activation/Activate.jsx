import ButtonStyle from "../../../assets/css/button.module.css"
export default function Activate({handlePageChange,handleActivation}){
    const handleSkipClick = () =>{
        handlePageChange(1)
    }
    return <>
                <div className={ButtonStyle['group']}>
                    <button 
                    className={`btn btn-primary ${ButtonStyle['prev']}`} 
                    onClick={handleSkipClick}>
                        Skip
                    </button>
                    <button 
                    className={`btn btn-primary ${ButtonStyle['skip']}`} 
                    onClick={handleActivation}>
                        Activate
                    </button>            
                </div>   
    </>   
}