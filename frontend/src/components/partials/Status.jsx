import * as Icon from "@aw-web-design/react-feather"

export default function Status({status}){
    if(status){
        return <Icon.CheckCircle color="green" size={48} style={{marginTop:"0.2vh",marginBottom:"0.2vh"}}/>               
    }
    return <Icon.XCircle color="red" size={48} style={{marginTop:"0.2vh",marginBottom:"0.2vh"}}/>               
}