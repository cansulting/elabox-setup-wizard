import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"

const useKeystoreStore = create(set => ({
    keystore:"",
    download: () =>{
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.DOWNLOAD_KEYSTORE,"","keystore").then(response => {
            const { message } = response
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(Buffer.from(message,"base64").toString()));
            element.setAttribute('download', "keystore.dat");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);                   
        })
    }
}))

export default useKeystoreStore