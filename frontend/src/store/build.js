import create from "zustand"
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"

const useBuildStore = create((set) => ({
    build:"",
    version:"",
    getInstallerInfo: () => {
        ElaboxEvent.sendRPC(constant.PACKAGE_ID,constant.GET_INFO,"","info").then(response => {
            if(response.code === 200){
                const info=JSON.parse(Buffer.from(response.message,"base64").toString())
                set(_=>({build:info.build,version:info.version}))
            }
        })
    }
}))

export default useBuildStore