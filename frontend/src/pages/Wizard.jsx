import {lazy, Suspense} from "react"
import useStepsStore from "../store/steps"
import WizardStyle from "../assets/css/wizard.module.css"
import Logo from "../components/partials/Logo"

const Welcome = lazy(() => import('../components/Welcome'))
const Storage = lazy(() => import('../components/Storage'))
const Did = lazy(() => import('../components/Did'))
const Password = lazy(() => import('../components/Password'))
const SetUp = lazy(() => import('../components/SetUp'))
const Finished = lazy(() => import('../components/Finished'))

export default function Wizard(){
    const steps = useStepsStore(state => state.steps)
    const increaseSteps = useStepsStore(state => state.increaseSteps)
    const decreaseSteps = useStepsStore(state => state.decreaseSteps)
    return <div className={WizardStyle["app-wizard"]}>
        <Suspense fallback={<></>}>
            <Logo/>
            {steps === 1 && <Welcome increaseSteps={increaseSteps}/>}
            {steps === 2 && <Storage increaseSteps={increaseSteps}/>}
            {steps === 3 && <Did decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}
            {steps === 4 && <Password decreaseSteps={decreaseSteps} increaseSteps={increaseSteps}/>}        
            {steps === 5 && <SetUp increaseSteps={increaseSteps}/>}                
            {steps === 6 && <Finished/>}                      
        </Suspense>

  
    </div>
}
