import { FunctionComponent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getAccounts } from "./utils"
import { Cuenta, ListaCuentas } from "./ListaCuentas"
import Load from "./Loading"

const CuentasView:FunctionComponent = () => {
  const [ cuentas, setCuentas ] = useState<Cuenta[]>([])
  const { cliente } = useParams()

  useEffect(() => {
    getAccounts(cliente)
      .then(res => setCuentas(res))
			.catch(err => console.log(`${cliente} no encontrado`))
  }, [])

  return <>
    <p>Consulta de saldo</p>
    <Link to="opciones">Opciones</Link>
    <h2>Selecciona la cuenta a consultar</h2>
    <div className="cuentas">
      <Load loaded={cuentas.length !== 0} custom="No posee cuentas">
        <ListaCuentas cuentas={cuentas}/>
      </Load>
    </div>
  </>
}

export default CuentasView