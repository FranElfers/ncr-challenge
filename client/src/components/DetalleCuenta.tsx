import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccount, getAccounts, newTransfer } from "../utils";
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
		getAccount(cliente, cuenta)
			.then(res => setDetails(res))
			.catch(err => console.log(`Cuenta de ${cliente} no encontrada`))
			
		// Lista de cuentas
		getAccounts(cliente)
			.then(res => setAccounts(res))
			.catch(err => console.log(`${cliente} no encontrado`))
	}

	useEffect(init, [])

	const transferHandle = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

		// Datos del formulario
		const entries = Object.fromEntries(new FormData(e.currentTarget))
		const amount = entries.amount as string
		const cuentaDestino = entries.amount as string

		if (details.balance - parseInt(amount as string) < 0) return alert('Saldo insuficiente')

    newTransfer(cliente, amount, cuenta, cuentaDestino)
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