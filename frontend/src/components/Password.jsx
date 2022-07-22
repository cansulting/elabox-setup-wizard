import { useState ,useEffect} from "react"
import {
    atleast6Characters, 
    doesNotContainsSpecialCharacters , 
    doesNotContainsSpace, 
    doesPasswordAndConfirmPasswordMatched
} from "../utils/auth"
import Spinner from "./partials/Spinner"
import SetUpCompleted from "./partials/SetupCompleted"
import Validation from "./partials/Validation"
import PasswordStyle from "../assets/css/password.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import FormStyle from "../assets/css/form.module.css"
import usePasswordStore from "../store/password"

export default function Password({increaseSteps,decreaseSteps}){
    const [pwd1, setPwd1] = useState('')
    const [pwd2, setPwd2] = useState('')   
    const initSetup = usePasswordStore(state => state.initSetup)
    const isSetup = usePasswordStore(state => state.isSetup)
    const initDoneSetup = usePasswordStore(state => state.initDoneSetup)
    const closeSetup =  usePasswordStore(state => state.closeSetup)
    const setPassword = usePasswordStore(state => state.setPassword)
    const isValidPassword = atleast6Characters(pwd1) &&  doesNotContainsSpecialCharacters(pwd1) && doesNotContainsSpace(pwd1) && doesPasswordAndConfirmPasswordMatched(pwd1,pwd2)
    const handleChange = event =>{
        const { target } = event;
        const value = target.value;
        if (target.id === "pwd1") {
            setPwd1(value)
        }
        else {
            setPwd2(value)
        }
    }
    const handleNextClick = () =>{
        initDoneSetup()
        increaseSteps()
    }
    const handlePrevClick = () => {
        decreaseSteps(2)
    }
    useEffect(()=>{
        initSetup()
        return ()=>{
            closeSetup()
        }
        // eslint-disable-next-line
    },[])
    useEffect(()=>{
        const isValid = atleast6Characters(pwd1) &&  doesNotContainsSpecialCharacters(pwd1) && doesNotContainsSpace(pwd1) && doesPasswordAndConfirmPasswordMatched(pwd1,pwd2)
        if (isValid){
            setPassword(pwd1)
        }
        // eslint-disable-next-line
    },[pwd1,pwd2])   

    if(isSetup === ""){
        return <Spinner/>
    }
    return <div className={PasswordStyle['app-password']}>
        <h1 className={PasswordStyle['header']}>Wallet Password</h1>
        <p className={PasswordStyle['intro']}>
            Build, sign and send transactions with security and trust.
        </p>
        {isSetup ? 
            <SetUpCompleted/>
        :
            <>
                <form>
                    <h3 className={PasswordStyle['header3']}>Setup Password</h3>            
                    <input id="pwd1" className={FormStyle['input']} type="password" onChange={handleChange}/>            
                    <h3 className={PasswordStyle['header3']}>Confirm Password</h3>
                    <input id="pwd2" className={FormStyle['input']} type="password" onChange={handleChange}/>                        
                </form>
                <div className={PasswordStyle['password-requirements']}>
                    <Validation label="Atleast 6 characters" validation={atleast6Characters} src={pwd1}/>  
                    <Validation label="Does not contains unix special characters" validation={doesNotContainsSpecialCharacters} src={pwd1}/>          
                    <Validation label="Does not contains space" validation={doesNotContainsSpace} src={pwd1}/>                            
                    <Validation label="Password and Confirm Password is the same" validation={()=>{
                        return doesPasswordAndConfirmPasswordMatched(pwd1,pwd2)
                    }} src={[pwd1,pwd2]}/> 
                </div>           
            </>
        }
        <div className={ButtonStyle['group']}>
            <button 
            className={`btn btn-primary ${ButtonStyle['prev']}`} 
            onClick={handlePrevClick}>
                Previous
            </button>
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']} ${!isSetup && !isValidPassword ? ButtonStyle['disabled']:''}`} 
            disabled={!isSetup && !isValidPassword}
            onClick={handleNextClick}>
                Next
            </button>            
        </div>
    </div>
}