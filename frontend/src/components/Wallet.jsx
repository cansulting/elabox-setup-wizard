import { useState } from 'react'
import useWalletStore from '../store/wallet'
import WalletStyle from "../assets/css/wallet.module.css"
import FormStyle from "../assets/css/form.module.css"
import ButtonStyle from "../assets/css/button.module.css"

export default  function Wallet ({decreaseSteps,increaseSteps}){
    const [tmpWallet,setTmpWallet] = useState('')
    const setWallet = useWalletStore(state => state.setWallet)
    const hasWallet = tmpWallet?.length > 0
    const handleChange = e =>{
        setTmpWallet(e.target.value)
    }
    const handlePrevClick = e =>{
        decreaseSteps()
    }
    const handleNextClick = e =>{
        setWallet(tmpWallet)
        increaseSteps()
    }
    return <div className={WalletStyle['app-wallet']}>
        <h1 className={WalletStyle['header']}>Ela mainchain Wallet</h1>
        <p className={WalletStyle['intro']}>
            Ela mainchain wallet address is used to receive your rewards
        </p>
        <form>
            <h3 className={WalletStyle['header3']}>Address</h3>            
            <input id="walletAddress" className={FormStyle['input']} type="text" onChange={handleChange}/>                        
        </form>
        <div className={ButtonStyle['group']}>
            <button 
            className={`btn btn-primary ${ButtonStyle['prev']}`} 
            onClick={handlePrevClick}>
                Previous
            </button>
            <button 
            className={`btn btn-primary ${ButtonStyle['skip']} ${!hasWallet ? ButtonStyle['disabled']:''}`} 
            disabled={!hasWallet}
            onClick={handleNextClick}>
                Next
            </button>            
        </div>        
    </div>
}