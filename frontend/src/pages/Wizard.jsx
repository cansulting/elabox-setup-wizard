import {lazy, Suspense, useEffect} from "react"
import useStepsStore from "../store/steps"
import useSetupStore from "../store/setUp"
import WizardStyle from "../assets/css/wizard.module.css"
import Logo from "../components/partials/Logo"
import Timeline from "../components/partials/Timeline"
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
    const steps = useStepsStore(state => state.steps)
    const increaseSteps = useStepsStore(state => state.increaseSteps)
    const decreaseSteps = useStepsStore(state => state.decreaseSteps)
    const setStep = useStepsStore( state => state.setStep)
    useEffect(() => {
        initSetup()
        if (setupStatus === SETUP_INPROGRESS)
            setStep(5)
        else if (setupStatus === SETUP_DONE)
            setStep(7)
    //eslint-disable-next-line
    },[])
    return <div className={WizardStyle["app-wizard"]}>
        <Suspense fallback={<></>}>
            {steps !== 5 && <Logo/>}
            {steps < 6 && <Timeline steps={steps} />}
            {steps === 1 && <Welcome increaseSteps={increaseSteps}/>}
            {steps === 2 && <Storage increaseSteps={increaseSteps}/>}
            {steps === 3 && <Did decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
            {steps === 4 && <Password decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}        
            {steps === 5 && <SetUp increaseSteps={increaseSteps}/>}             
            {steps === 6 && <KeyStore increaseSteps={increaseSteps}/>}   
            {steps === 7 && <Finished/>}                      
        </Suspense>
    </div>
}
