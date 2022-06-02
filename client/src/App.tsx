import { FunctionComponent, useEffect, useState } from 'react'
import './App.css'
import logo from './ncr.png'

const Cuenta:FunctionComponent<{name:string,id:string}> = ({name,id}) => {
  return <div className="cuenta">
    <h3>{name}</h3>
    <p>Nro: {id}</p>
  </div>
}

function App() {
  const [ cuentas, setCuentas ] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/123')
      .then(res => res.json())
      .then(res => setCuentas(res))
  }, [])

  useEffect(() => {
    console.log(cuentas)
  }, [cuentas])
  return <>
    <header className="App-header">
      <img src={logo} alt="logo" />
    </header>
    <div className="content">
      <p>Consulta de saldo</p>
      <h2>Selecciona la cuenta a consultar</h2>
      <div className="cuentas">
        <Cuenta name='Cuenta Corriente' id='123124' />
        <Cuenta name='Cuenta Corriente' id='123124' />
        <Cuenta name='Cuenta Corriente' id='123124' />
        <Cuenta name='Cuenta Corriente' id='123124' />
        <Cuenta name='Cuenta Corriente' id='123124' />
      </div>
      <button className="salir">Salir</button>
    </div>
  </>
}

export default App
