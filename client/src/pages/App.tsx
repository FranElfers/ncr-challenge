import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import DetalleCuenta from './DetalleCuenta'
import CuentasView from './Cuentas'
import Dashboard from './Dashboard'
import OpcionesView from './Opciones'
import Login from './Login'
import logo from '../assets/ncr.png'
import '../assets/App.css'

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
