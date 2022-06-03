import { FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "./utils"


interface Transfer {
	timestamp: string
	amount: number
	from: string
	to: string
}

const Transferencias:FunctionComponent = () => {
  const { cliente } = useParams()
	const [ transfers, setTransfers ] = useState<any[]>([])

	const sortByDate = (list:Transfer[]) => 
		list.sort((a,b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf())

	const init = () => {
		// Transferencias
		fetch(`${SERVER_URL}/${cliente}/transferencias`)
			.then(res => res.json())
			.then(res => setTransfers(sortByDate(res.list)))
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