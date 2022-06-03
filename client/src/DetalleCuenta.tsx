import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "./utils";
import Load from "./Loading";

interface Details {
	client: string
	name: string
	balance: number
	transferencias: any
	cbu: number
}

const DetalleCuenta:FunctionComponent = () => {
  const { cliente, cuenta } = useParams()
	const [ accounts, setAccounts ] = useState<any[]>([])
	const [ details, setDetails ] = useState<Details>({
		client: '',
		name: '',
		balance: 0,
		transferencias: '',
		cbu: 0
	})

	const init = () => {
		// Detalles de la cuenta
		fetch(`${SERVER_URL}/${cliente}/${cuenta}`)
			.then(res => res.json())
			.then(res => setDetails(res))

		// Lista de cuentas
		fetch(`${SERVER_URL}/${cliente}`)
			.then(res => res.json())
			.then(res => setAccounts(res.list))
	}

	useEffect(init, [])

	const transferHandle = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
		const { account, amount } = Object.fromEntries(new FormData(e.currentTarget))

		if (details.balance - parseInt(amount as string) < 0) return alert('Saldo insuficiente')

		const queries = `?monto=${amount}&origen=${cuenta}&destino=${account}`

    fetch(`${SERVER_URL}/${cliente}/nueva/transferencia${queries}`,{method:"POST"})
			.then(init)
      .catch(console.log)
	}
	
	return <Load loaded={Object.keys(details).length !== 0}>
		<div className="detalleCuenta">
			<h3>{details.name}</h3>
			<p>Nro. <span>{cuenta}</span></p>
			<p>Saldo disponible: <span>${details.balance}</span></p>
			<p>CBU: <span>{details.cbu}</span></p>
			<p>transferencias </p>

			<form className="nuevaTransferencia" onSubmit={transferHandle}>
				<h4>Nueva transferencia</h4>
				<div className="field">
					<label>Seleccionar cuenta destino</label>
					<Load loaded={accounts.length !== 0}>
						<select name="account" required>
							{accounts.map(({id}) => {
								if (id === cuenta) return
								return <option key={id} value={id}>Nro. {id}</option>
							})}
						</select>
					</Load>
				</div>
				<div className="field">
					<label>Ingresar monto</label>
					<input  type="number" name="amount" required/>
				</div>
				<button type="submit" className="verde">Realizar transferencia</button>
			</form>
		</div>
	</Load>
}

export default DetalleCuenta