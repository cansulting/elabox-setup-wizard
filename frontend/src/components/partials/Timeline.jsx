import * as Icon from "@aw-web-design/react-feather"
import TimelineStyle from "../../assets/css/timeline.module.css"
import useDidStore from "../../store/did"
import useSetupStore from "../../store/setUp"
import usePasswordStore from "../../store/password"
import useStorageStore from "../../store/storage"

const TIMELINE_ICON_SIZE = 15
export default function Timeline({steps}){
    const isStorageSetup = useStorageStore(state=>state.isSetup)
    const isDidSetup = useDidStore(state=>state.isSetup)
    const isPasswordSetup = usePasswordStore(state=>state.isSetup)
    const setupStatus = useSetupStore(state=>state.setupStatus)
    const showPasswordStatus = !isDidSetup && steps > 3
    return <div className={TimelineStyle['timeline']}>
        <div>
            {steps > 1 ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
            <p className={steps > 1 ? TimelineStyle['active']:""}>Welcome</p>
        </div>
        <hr style={{borderColor: steps > 1 ? "green":"initial"}}/>        
        <div>
            {isStorageSetup ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
            <p className={isStorageSetup ? TimelineStyle['active']:""}>Storage</p>
        </div>               

        <hr style={{borderColor: steps > 2 ? "green":"initial"}}/>
        {!showPasswordStatus  && <div>
            {isDidSetup ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
            <p className={isDidSetup ? TimelineStyle['active']:""}>Did</p>
        </div>     }
        {showPasswordStatus && <div>
            {isPasswordSetup ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/>}
            <p className={isPasswordSetup ? TimelineStyle['active']:""}>Password</p>
        </div>   }
        <hr style={{borderColor: steps > 5 ? "green":"initial"}}/>        
        <div>
            {setupStatus === "setup" ? <Icon.CheckCircle color="green" size={TIMELINE_ICON_SIZE}/>:<Icon.Circle size={TIMELINE_ICON_SIZE}/> }
            <p className={setupStatus === "completed" ? TimelineStyle['active']:""}>Complete</p>
        </div>        
    </div> 
}