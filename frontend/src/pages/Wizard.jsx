import {lazy, Suspense, useEffect, useState} from "react"
import useStepsStore from "../store/steps"
import useSetupStore from "../store/setUp"
import WizardStyle from "../assets/css/wizard.module.css"
import Logo from "../components/partials/Logo"
const Welcome = lazy(() => import('../components/Welcome'))
const Storage = lazy(() => import('../components/Storage'))
const Did = lazy(() => import('../components/Did'))
const Password = lazy(() => import('../components/Password'))
const SetUp = lazy(() => import('../components/SetUp'))
const Finished = lazy(() => import('../components/Finished'))
const KeyStore = lazy(() => import("../components/Keystore"))

const SETUP_DONE = 'setup'
const SETUP_INPROGRESS = "setting_up"

export default function Wizard(){
    const initSetup = useSetupStore(state => state.initSetup)
    const setupStatus = useSetupStore(state => state.setupStatus)
    const startSetup = useSetupStore(state => state.startSetup)
    const steps = useStepsStore(state => state.steps)
    const increaseSteps = useStepsStore(state => state.increaseSteps)
    const decreaseSteps = useStepsStore(state => state.decreaseSteps)
    const setStep = useStepsStore( state => state.setStep)
    const [dlkey, setDlkey] = useState(false)
    const onBeginSetup = () => {
        startSetup()
        setDlkey(true)
        setStep(5)
    }
    // called after downloaded the keystore
    const onDownloadedKey = () => {
        setDlkey(false)
    }
    useEffect(() => {
        initSetup()
        console.log(setupStatus)
        if (setupStatus === SETUP_INPROGRESS) 
            onBeginSetup()
        else if (setupStatus === SETUP_DONE)
            setStep(6)
    //eslint-disable-next-line
    },[setupStatus, setStep])
    
    return <div className={WizardStyle["app-wizard"]}>
        <Suspense fallback={<></>}>
            {steps !== 5 && <Logo/>}
            {steps === 1 && <Welcome increaseSteps={increaseSteps}/>}
            {steps === 2 && <Storage increaseSteps={increaseSteps}/>}
            {steps === 3 && <Did decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
            {steps === 4 && <Password decreaseSteps={decreaseSteps} increaseSteps={onBeginSetup}/>}        
            {steps === 5 && <SetUp/>}             
            {steps === 6 && dlkey && <KeyStore increaseSteps={onDownloadedKey}/>}   
            {steps === 6 && !dlkey && <Finished/>}                      
        </Suspense>
    </div>
}
