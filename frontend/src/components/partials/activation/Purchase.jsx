import * as Icon from "react-feather"
import ActivationStyle from "../../../assets/css/activation.module.css"
import ButtonStyle from "../../../assets/css/button.module.css"

export default function Purchase({increaseSteps,handlePurchase}){
    return <>
            <div className={ActivationStyle['table-container']}>
                <table className={ActivationStyle['table']}>
                    <thead>
                        <tr>
                            <th> </th>
                            <th style={{ paddingRight: 15 }}>Free</th>
                            <th style={{ paddingRight: 15 }}>Premium</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nodes(Mainchain,ESC,DID)</td>
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
            </div>
            <div className={ButtonStyle['group']}>
                <button 
                className={`btn btn-primary ${ButtonStyle['prev']}`} 
                onClick={increaseSteps}>
                    Skip
                </button>
                <button 
                className={`btn btn-primary ${ButtonStyle['skip']}`} 
                onClick={handlePurchase}>
                    Purchase
                </button>            
            </div>       
    </>
}