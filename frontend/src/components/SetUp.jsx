import { useEffect } from 'react';
import SetupStyle from "../assets/css/setup.module.css"
import useDidStore from '../store/did';
import usePasswordStore from '../store/password';
import useSetupStore from '../store/setUp';
import useStepsStore from '../store/steps';
import useStorageStore from '../store/storage';
import Spinner from './partials/Spinner';

export default function SetUp({increaseSteps}){
    const storage_id = useStorageStore(state => state.storage)
    const did = useDidStore(state => state.did)
    const password = usePasswordStore(state => state.password)
    const isPasswordSetup = usePasswordStore(state=>state.isSetup)
    const processSetUp = useSetupStore(state=>state.processSetUp)
    const setStep = useStepsStore(state=>state.setStep)
    useEffect(()=>{
        const data = {
            did,
            password,
            storage_id
        }
        processSetUp(data).then( _ =>{
            if(isPasswordSetup) {
                setStep(6)
                return
            }
            setStep(7)
        })
        // eslint-disable-next-line        
    },[])
    return <div className={SetupStyle['app-setup']}>
        <h1>Setting up Elabox</h1>
        <p>Please wait this might take awhile.</p>
        <Spinner type='dotted' />
    </div>
}