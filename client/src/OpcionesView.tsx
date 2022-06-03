import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAccount, getAccounts, newAccount } from "./utils"

const OpcionesView = () => {
	const [ max, setMax ] = useState(true)
  const { cliente } = useParams()

	const createAccount = (type:string) => {
    newAccount(cliente, type).then(console.log).catch(console.log)
  }

	useEffect(() => {
		getAccounts(cliente).then(res => {
			console.log(res.length, res.length >= 5)
			return setMax(res.length >= 5)})
	}, [])

	return <>
		<h4>Opciones</h4>
		<div className="opciones">
			<button disabled={max} className="verde" onClick={() => createAccount("ahorro")}>Crear cuenta de ahorro</button>
			<button disabled={max} className="verde" onClick={() => createAccount("corriente")}>Crear cuenta corriente</button>
			{max && <p>Maximo de cuentas alcanzado</p>}
		</div>
	</>
}

export default OpcionesView