import  { lazy, Suspense, useEffect } from 'react'
import Spinner from './components/partials/Spinner'
import useErrorStore from './store/error'
import './assets/css/App.css'
import useSetupStore from './store/setUp'
import InstallerDetails from './components/partials/InstallerDetails'

const Error = lazy(() => import('./pages/Error'))
const Wizard = lazy(() => import('./pages/Wizard'))

function App() {
  const initSetup = useSetupStore(state => state.initSetup)
  const initErrorSetup = useErrorStore (state => state.initSetup)
  const hasError = useErrorStore(state => state.hasError)
  useEffect(()=>{
    initSetup()
    initErrorSetup()
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      <Suspense fallback={<Spinner type="dotted"/>}>
        {hasError ? <Error/> : <Wizard/>}
        <InstallerDetails/>
      </Suspense>
    </div>
  )
}

export default App
