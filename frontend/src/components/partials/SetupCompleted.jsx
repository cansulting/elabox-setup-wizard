import * as Icon from "@aw-web-design/react-feather"
import CompletedStyle from "../../assets/css/completed.module.css"
export default function SetUpCompleted(){
    return <div className={CompletedStyle['app-completed']}>
        <span>
            <Icon.CheckCircle color="green" size={"10vh"}/>            
        </span>
        <span>
            <h2>Completed</h2>    
        </span>
     </div>
}