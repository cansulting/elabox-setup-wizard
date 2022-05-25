import ReactDom from "react-dom"
import * as Icon from "@aw-web-design/react-feather"
import ModalStyle from "../../../assets//css/modal.module.css"
import WarningStyle from "../../../assets/css/modal/warning.module.css"
import ButtonStyle from "../../../assets//css/button.module.css"

export default function Warning({ 
    isOpen = false,message="",
    onClose = ()=>{}, onConfirm = () =>{} 
    }){
    if(isOpen){
        return ReactDom.createPortal(<div className="modal">
    <div className={`modal-content ${ModalStyle['modal-content-warning']}`}>
          <span className="close" onClick={onClose}>&times;</span>
          <div className={WarningStyle['body']}>
            <div className={WarningStyle['icon']}>
                <Icon.AlertCircle color="yellow" size={48}/>
            </div>
            <p>{message}</p>
            <div className={WarningStyle['controls']}>
                <button className={`btn ${ButtonStyle['warning']}`} onClick={onConfirm}>Ok</button>
                <button className={`btn ${ButtonStyle['primary']}`} onClick={onClose} >Cancel</button>                
            </div>
          </div>
        </div>
      </div>
      ,document.getElementById("modal"))
    }
    return <></>
}