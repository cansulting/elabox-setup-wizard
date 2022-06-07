import * as Icon from "@aw-web-design/react-feather"

export default function SetUpCompleted(){
    return <div style={{marginTop:"8vh", marginBottom:"8vh"}}>
        <span>
            <Icon.CheckCircle color="green" size={"10vh"}/>            
        </span>
        <span>
            <h2>Completed</h2>    
        </span>
     </div>
}