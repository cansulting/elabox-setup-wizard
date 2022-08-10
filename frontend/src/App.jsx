import  { lazy, Suspense, useEffect } from 'react'
import {
  Helmet
} from "react-helmet";
import Spinner from './components/partials/Spinner'
import useErrorStore from './store/error'
import useSetupStore from './store/setUp'
import useBuildStore from './store/build'
import InstallerDetails from './components/partials/InstallerDetails'
import './assets/css/App.css'

const Error = lazy(() => import('./pages/Error'))
const Wizard = lazy(() => import('./pages/Wizard'))

function App() {
  const initSetup = useSetupStore(state => state.initSetup)
  const initErrorSetup = useErrorStore (state => state.initSetup)
  const hasError = useErrorStore(state => state.hasError)
  const getInstallerInfo = useBuildStore(state => state.getInstallerInfo)
  const isOnionUrl = window.location.href.includes(".onion")
  useEffect(()=>{
    initSetup()
    initErrorSetup()
    getInstallerInfo()
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
        {!isOnionUrl && <Helmet>
            <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
            <meta http-equiv="Pragma" content="no-cache" />
            <meta http-equiv="Expires" content="0" />                
          </Helmet>}      
      <Suspense fallback={<Spinner type="dotted"/>}>
        {hasError ? <Error/> : <Wizard/>}
        <InstallerDetails/>
      </Suspense>
    </div>
  )
}

export default App
