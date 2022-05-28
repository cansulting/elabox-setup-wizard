import * as Icon from "@aw-web-design/react-feather"
import TimelineStyle from "../assets/css/timeline.module.css"
import useDidStore from "../store/did"
import useSetupStore from "../store/setUp"
import useStepsStore from "../store/steps"
import usePasswordStore from "../store/password"
import useStorageStore from "../store/storage"

const TIMELINE_ICON_SIZE = 15
export default function Timeline(){
    const steps = useStepsStore(state=>state.steps)
    const isStorageSetup = useStorageStore(state=>state.isSetup)
    const isDidSetup = useDidStore(state=>state.isSetup)
    const isPasswordSetup = usePasswordStore(state=>state.isSetup)
    console.log(isPasswordSetup)
    const setupStatus = useSetupStore(state=>state.setupStatus)
    const showPasswordStatus = !isDidSetup && steps > 3
    return <div className={TimelineStyle['timeline']}>
        <div>
            {steps > 1 ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
            <p>Welcome</p>
        </div>
        <hr style={{borderColor: steps > 1 ? "green":"initial"}}/>        
        <div>
            {isStorageSetup ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
            <p>Storage</p>
        </div>
        {showPasswordStatus ? <>
            <hr style={{borderColor: steps > 3 ? "green":"initial"}}/>
        <div>
            {isPasswordSetup ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/>}
            <p>Password</p>
        </div>                
        </>:<>
            <hr style={{borderColor: steps > 2 ? "green":"initial"}}/>
            <div>
                {isDidSetup ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
                <p>Did</p>
            </div>        
        </>}
        <hr style={{borderColor: steps > 5 ? "green":"initial"}}/>        
        <div>
            {setupStatus === "completed" ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
            <p>Setup</p>
        </div>        
    </div> 
}