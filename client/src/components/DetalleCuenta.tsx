import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccount, getAccounts, newTransfer } from "../utils";
import Load from "./Loading";
import { Details } from "./tipos.interface";


const DetalleCuenta:FunctionComponent = () => {
  const { cliente, cuenta } = useParams()
	const [ accounts, setAccounts ] = useState<any[]>([])
	const [ details, setDetails ] = useState<Details | undefined>()

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

	const transferHandle = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
		if (!details) return

		// Datos del formulario
		const { amountStr, toAccount } = Object.fromEntries(new FormData(e.currentTarget)) as {amountStr:string,toAccount:string}
		const amount = parseInt(amountStr)

		if (details.balance - amount < 0) return alert('Saldo insuficiente')

    newTransfer(cliente, amount, cuenta, toAccount)
			.then(init)
      .catch(console.log)
	}

	useEffect(init, [])

	if (!details) return <p>Loading</p>
	
	return <Load loaded={Boolean(details)}>
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
						<select name="toAccount" required>
							{accounts.map(({id}) => {
								if (id === cuenta) return
								return <option key={id} value={id}>Nro. {id}</option>
							})}
						</select>
					</Load>
				</div>
				<div className="field">
					<label>Ingresar monto</label>
					<input  type="number" name="amountStr" required/>
				</div>
				<button type="submit" className="verde">Realizar transferencia</button>
			</form>
		</div>
	</Load>
}

export default DetalleCuenta