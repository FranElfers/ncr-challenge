import { FunctionComponent, MouseEventHandler } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Account } from "../tipos.interface"

const Cuenta:FunctionComponent<{account:Account}> = ({account}) => {
	const navigate = useNavigate()
  const { cliente } = useParams()

	const handler:MouseEventHandler = () => {
		navigate(`/${cliente}/cuentas/${account.id}`, {replace:true})
	}
	
  return <div key={account.id} className="cuenta" onClick={handler}>
    <h3>{account.name}</h3>
    <p>Nro: {account.id}</p>
  </div>
}

export const ListaCuentas:FunctionComponent<{accounts:Account[]}> = ({accounts}) => {
  return <>
    {accounts.map((a:Account) => <Cuenta key={a.id} account={a} />)}
  </>
}