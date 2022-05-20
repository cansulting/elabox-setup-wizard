import  { lazy, Suspense } from 'react'
import Spinner from './components/partials/Spinner'
import Logo from './components/partials/Logo'
import useErrorStore from './store/error'
import './assets/css/App.css'

const Error = lazy(() => import('./pages/Error'))
const Wizard = lazy(() => import('./pages/Wizard'))

function App() {
  const hasError = useErrorStore(state => state.hasError)
  return (
    <div className="App">
      <Suspense fallback={<Spinner type="dotted"/>}>
        {hasError ? <Error/> : <Wizard/>}
      </Suspense>
    </div>
  )
}

export default App
