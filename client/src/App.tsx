import { useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import logo from './ncr.png'
import './App.css'
import DetalleCuenta from './components/DetalleCuenta'
import CuentasView from './CuentasView'
import Dashboard from './Dashboard'
import OpcionesView from './OpcionesView'


const Login = () => {
  const clientName = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
  const login = () => {
    navigate("/"+clientName.current?.value, {replace:true})
  }

  return <form>
    <input ref={clientName} type="text" required />
    <button type='submit' className="verde" onClick={login}>Ingresar</button>
  </form>
}

function App() {
	const navigate = useNavigate()

  // location = ['cliente','cuentas','opciones']
  const location = useLocation().pathname.split('/')
  
  // location = ['cliente','cuentas']
  location.pop()  
  
  // location = 'cliente/cuentas'
  const back = location.join('/')

  return <>
    <header className="App-header">
      <img src={logo} alt="logo" />
    </header>
    <div className="content">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path=":cliente" element={<Dashboard />} />
        <Route path=":cliente/cuentas" element={<CuentasView />} />
        <Route path=":cliente/cuentas/opciones" element={<OpcionesView />} />
        <Route path=":cliente/cuentas/:cuenta" element={<DetalleCuenta />} />
      </Routes>
    </div>
    <button onClick={() => navigate(back)} className="salir verde">Atras</button>
  </>
}

export default App
