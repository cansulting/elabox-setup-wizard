
// this displays the license activation page

import React from 'react'
import * as Icon from "react-feather"
import ActivationStyle from "../assets/css/activation.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import { activateLicense } from '../utils/license'

export default function Activation({increaseSteps}) {
    const handlePurchaseClick = async ()=>{
        let res = await activateLicense()
        if(res){
            increaseSteps()
        }        
    }
    return ( 
        <div className={ActivationStyle['app-activation']}>
            <h1>Activate Elabox</h1>
            <p>Unlock rewards and premium support</p>            
            <table className={ActivationStyle['table']}>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Free</th>
                        <th>Premium</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ paddingRight: 30 }}>Nodes(Mainchain,ESC,DID)</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                    </tr>
                    <tr>
                        <td>dApps</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                    </tr>
                    <tr>
                        <td>dApps services</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                    </tr>
                    <tr>
                        <td>Premium Support</td>
                        <td>{<Icon.XCircle height={20} width={20} color="red" />}</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                    </tr>
                    <tr>
                        <td>Rewards</td>
                        <td>{<Icon.XCircle height={20} width={20} color="red" />}</td>
                        <td>{<Icon.CheckCircle height={20} width={20} color="green" />}</td>
                    </tr>
                </tbody>
            </table>
            <div className={ButtonStyle['group']}>
                <button 
                className={`btn btn-primary ${ButtonStyle['prev']}`} 
                onClick={increaseSteps}>
                    Skip
                </button>
                <button 
                className={`btn btn-primary ${ButtonStyle['skip']}`} 
                onClick={handlePurchaseClick}>
                    Purchase
                </button>            
            </div>   
        </div>   
    )
}