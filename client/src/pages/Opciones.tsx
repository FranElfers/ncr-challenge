import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAccounts, newAccount } from "../utils"

const OpcionesView = () => {
	const [ max, setMax ] = useState(true)
  const { cliente } = useParams()

	const update = () => {
		getAccounts(cliente).then(res => setMax(res.length >= 4))
	}

	const createAccount = (type:string) => {
		newAccount(cliente, type).then(console.log).catch(console.log)
		return update()
  }

	useEffect(update, [])

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