import { useEffect } from 'react';
// import useErrorStore from '../store/error';
import SetupStyle from "../assets/css/setup.module.css"
import Spinner from './partials/Spinner';

export default function SetUp({increaseSteps}){
    // const toggleError = useErrorStore(state => state.toggleError);
    useEffect(()=>{
        setTimeout(()=>{
            // toggleError()
            increaseSteps()
        },5 * 1000)
    },[increaseSteps])
    return <div className={SetupStyle['app-setup']}>
        <h1>Setting up Elabox</h1>
        <p>Please wait this might take awhile.</p>
        <Spinner type='dotted' />
    </div>
}