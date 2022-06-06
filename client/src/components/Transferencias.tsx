import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTransfers } from "../utils"
import { Transfer } from "./tipos.interface"

const Transferencia:FunctionComponent<{transfer:Transfer}> = ({transfer}) => {
	return <div key={transfer.timestamp} className="transfer">
		{(new Date(transfer.timestamp)).toLocaleString()}
		<span>${transfer.amount}</span>
		Nro {transfer.from} → Nro {transfer.to}
	</div>
}

const Transferencias:FunctionComponent = () => {
	const [ transfers, setTransfers ] = useState<Transfer[]>([])
  const { cliente } = useParams()

	useEffect(() => {
		getTransfers(cliente)
			.then(res => setTransfers(res))
			.catch(err => alert(`${cliente} no encontrado`))
	}, [])

	return <div className="transfers">
		{transfers.map((t:Transfer) => <Transferencia transfer={t} />)}
	</div>
}

export default Transferencias