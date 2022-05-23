import create from "zustand";
import * as constant from "../utils/constants"
import ElaboxEvent from "../utils/ElaboxEvent";

const useSetupStore = create(set => ({
    isetUpCompleted:false,    
    initSetup: () =>{
        ElaboxEvent.subscribe(constant.PACKAGE_ID,(args)=>{
            console.log(args)
        })
    },
    processSetUp: () => set(state => ({ isetUpCompleted: true })),
}))

export default useSetupStore