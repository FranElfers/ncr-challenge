import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "./utils"
import { Cuenta, ListaCuentas } from "./ListaCuentas"
import Load from "./Loading"

const CuentasView:FunctionComponent = () => {
  const [ cuentas, setCuentas ] = useState<Cuenta[]>([])
  const { cliente } = useParams()

  const callAPI = () => {
    fetch(`${SERVER_URL}/${cliente}`)
      .then(res => res.json())
      .then(res => setCuentas(res.list))
      .catch(err => alert('No hay conexion con el servidor'))
  }

  useEffect(() => {
    callAPI()
  }, [])

  const createAccount = () => {
    fetch(`${SERVER_URL}/${cliente}/nueva/cuenta?monto=10&tipo=ahorro`,{method:"POST"})
      .then(callAPI)
  }

  return <>
    <p>Consulta de saldo</p>
    <h2>Selecciona la cuenta a consultar</h2>
    <div className="cuentas">
      <Load loaded={cuentas.length !== 0} custom="No posee cuentas">
        <ListaCuentas cuentas={cuentas}/>
      </Load>
      <button className="verde" onClick={createAccount}><p>Crear cuenta</p></button>
      <button className="verde"><p>Mas opciones</p></button>
    </div>
  </>
}

export default CuentasView