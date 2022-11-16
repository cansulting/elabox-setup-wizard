import React,{useState} from 'react'
import ActivationStyle from "../assets/css/activation.module.css"
import { activateLicense } from '../utils/license'
import ActivationPage from "./partials/activation/Activate"
import PurchasePage from './partials/activation/Purchase'

export default function Activation({increaseSteps}) {
    const [currentActivationPage,setCurrentActivationPage] = useState(0)
    const handlePageChange = page =>{
        setCurrentActivationPage(page)
    }
    const handleActivation = async () =>{
        let res = await activateLicense()
        if(res){
            increaseSteps()
        }        
    }
    const handlePurchase = ()=>{
        window.open('https://store.elabox.com/', '_blank')
    }
    return ( 
        <div className={ActivationStyle['app-activation']}>
            <h1>Activate Elabox</h1>
            <p>Unlock rewards and premium support</p>            
            {currentActivationPage === 0 ? 
            <ActivationPage 
                handlePageChange={handlePageChange} 
                handleActivation={handleActivation}/> : 
            <PurchasePage 
                increaseSteps={increaseSteps} 
                handlePurchase={handlePurchase}/>            
            }
        </div>   
    )
}