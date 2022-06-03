import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTransfers } from "../utils"


interface Transfer {
	timestamp: string
	amount: number
	from: string
	to: string
}

const Transferencias:FunctionComponent = () => {
  const { cliente } = useParams()
	const [ transfers, setTransfers ] = useState<any[]>([])

	const init = () => {
		// Transferencias
		getTransfers(cliente)
			.then(res => setTransfers(res))
			.catch(err => console.log(`${cliente} no encontrado`))
	}

	useEffect(init, [])

	const generateText = (t:Transfer) => `Nro ${t.from} → Nro ${t.to}`

	return <div className="transfers">
		{transfers.map((transfer:Transfer) => 
			<div key={transfer.timestamp} className="transfer">
				{(new Date(transfer.timestamp)).toLocaleString()}
				<span>${transfer.amount}</span>
				{generateText(transfer)}
			</div>
		)}	
	</div>
}

export default Transferencias