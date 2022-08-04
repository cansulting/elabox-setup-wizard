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
const Activation  = lazy(() => import("../components/Activation"))

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
    const [setupInitiated, setSetupInitiated] = useState(false)
    const onBeginSetup = () => {
        setSetupInitiated(true)
        startSetup()
        setDlkey(true)
        setStep(6)
    }
    // called after downloaded the keystore
    const onDownloadedKey = () => {
        setDlkey(false)        
    }
    useEffect(() => {
        initSetup()
        if (setupStatus === SETUP_INPROGRESS) {
            onBeginSetup()
        } else { 
            const isConfigRoute = window.location.href.includes("/config")
            if(!isConfigRoute || setupInitiated){
                if (setupStatus === SETUP_DONE)
                    setStep(7)
            }
        }
    //eslint-disable-next-line
    },[setupStatus, setStep])
    return <div className={WizardStyle["app-wizard"]}>
        <Suspense fallback={<></>}>
            {steps !== 5 && <Logo/>}
            {steps === 1 && <Welcome increaseSteps={increaseSteps}/>}
            {steps === 2 && <Activation increaseSteps={increaseSteps}/>}
            {steps === 3 && <Storage decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
            {steps === 4 && <Did decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
            {steps === 5 && <Password decreaseSteps={decreaseSteps} increaseSteps={onBeginSetup}/>}        
            {steps === 6 && <SetUp/>}             
            {steps === 7 && dlkey && <KeyStore increaseSteps={onDownloadedKey}/>}   
            {steps === 7 && !dlkey && <Finished />}                                  
        </Suspense>
    </div>
}
