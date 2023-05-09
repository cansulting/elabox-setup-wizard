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
    const version_type = useSetupStore( state => state.version_type)
    const isLiteVersion = version_type === "lite"
    const [setupInitiated, setSetupInitiated] = useState(false)
    const onBeginSetup = () => {
        setSetupInitiated(true)
        startSetup()
        setStep(6)
    }
    useEffect(() => {
        initSetup()
        if (setupStatus === SETUP_INPROGRESS) {
            onBeginSetup()
        } else { 
            const isConfigRoute = window.location.href.includes("/config")
            if(!isConfigRoute){
                if (setupStatus === SETUP_DONE)
                    setStep(7)
            } else {
                // is config and setup finished?
                if (steps === 6 && setupStatus === SETUP_DONE)
                    setStep(7)
            }
        }
    //eslint-disable-next-line
    },[setupStatus, setStep])
    return <div className={WizardStyle["app-wizard"]}>
        <Suspense fallback={<></>}>
            <Logo/>            
            {steps === 1 && <Welcome increaseSteps={increaseSteps}/>}
            {steps === 2 && <Activation increaseSteps={increaseSteps}/>}
            { !isLiteVersion && <>
                {steps === 3 && <Storage decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
                {steps === 4 && <Did decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
                {steps === 5 && <Password decreaseSteps={decreaseSteps} increaseSteps={onBeginSetup}/>}        
                {steps === 6 && <SetUp/>}             
                {steps === 7 && <Finished />}    
                </>
            }      
            { isLiteVersion && <>
                {steps === 3 && <Did decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
                {steps === 4 && <Password decreaseSteps={decreaseSteps} increaseSteps={onBeginSetup}/>}        
                {steps === 5 && <SetUp/>}             
                {steps >= 6 && <Finished />} 
            </>
            }                        
        </Suspense>
    </div>
}
