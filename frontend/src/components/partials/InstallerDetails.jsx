import InstallerDetailsStyle from "../../assets/css/installer_details.module.css"
import useBuildStore from "../../store/build"
export default function InstallerDetails(){
    const build = useBuildStore(state => state.build)
    const version = useBuildStore(state => state.version)
    return <div className={InstallerDetailsStyle['app-installer-details']}>
        <p>Build: {build}</p>
        <p>Version: {version}</p>
    </div>       
}