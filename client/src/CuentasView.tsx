import { FunctionComponent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getAccounts } from "./utils"
import { ListaCuentas } from "./components/ListaCuentas"
import Load from "./components/Loading"
import { Account } from "./components/tipos.interface"

const CuentasView:FunctionComponent = () => {
  const [ accounts, setAccounts ] = useState<Account[]>([])
  const { cliente } = useParams()

  useEffect(() => {
    getAccounts(cliente)
      .then(res => setAccounts(res))
			.catch(err => alert(`${cliente} no encontrado`))
  }, [])

  return <>
    <p>Consulta de saldo</p>
    <Link to="opciones">Opciones</Link>
    <h2>Selecciona la cuenta a consultar</h2>
    <div className="cuentas">
      <Load loaded={accounts.length !== 0} custom="No posee cuentas">
        <ListaCuentas accounts={accounts}/>
      </Load>
    </div>
  </>
}

export default CuentasView