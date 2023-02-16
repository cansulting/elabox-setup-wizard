import { useEffect } from 'react';
import { isKeystoreWillBeGenerated } from '../utils/config';
import SetupStyle from "../assets/css/setup.module.css"
import useDidStore from '../store/did';
import usePasswordStore from '../store/password';
import useSetupStore from '../store/setUp';
import useStorageStore from '../store/storage';
import Spinner from './partials/Spinner';
import useWalletStore from '../store/wallet';

export default function SetUp(){
    const storage_id = useStorageStore(state => state.storage)
    const did = useDidStore(state => state.did)
    const wallet = useWalletStore(state=>state.wallet)    
    const password = usePasswordStore(state => state.password)
    const processSetUp = useSetupStore(state=>state.processSetUp)
    useEffect(()=>{
        const data = {
            did,
            wallet_address: wallet,            
            pass: password,
            storage_id,
            skipKeystoreGeneration: isKeystoreWillBeGenerated
        }
        processSetUp(data)
        // eslint-disable-next-line        
    },[])
    return <div className={SetupStyle['app-setup']}>
        <h1>Setting up Elabox</h1>
        <p>Please wait this might take awhile.</p>
        <Spinner type='dotted' />
    </div>
}