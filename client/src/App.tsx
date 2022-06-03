import { useRef } from 'react'
import { Link, Routes, Route, useNavigate, Navigate, useParams, useLocation } from 'react-router-dom'
import logo from './ncr.png'
import './App.css'
import DetalleCuenta from './DetalleCuenta'
import CuentasView from './CuentasView'
import Dashboard from './Dashboard'


const Login = () => {
  const clientName = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
  const login = () => {
    navigate("/"+clientName.current?.value, {replace:true})
  }

  return <>
    <input ref={clientName} type="text" />
    <button className="verde" onClick={login}>Ingresar</button>
  </>
}

function App() {
	const navigate = useNavigate()
  const location = useLocation().pathname.split('/')

  // Remover ultimo elemento para navegar hacia atras
  location.pop()  
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
        <Route path=":cliente/cuentas/:cuenta" element={<DetalleCuenta />} />
      </Routes>
    </div>
    <button onClick={() => navigate(back)} className="salir verde">Atras</button>
  </>
}

export default App
