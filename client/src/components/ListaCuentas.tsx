import { EventHandler, FunctionComponent, MouseEventHandler } from "react"
import { useNavigate, useParams } from 'react-router-dom'

export interface Cuenta {
  id: string
  name: string
  client: string
}

export const ListaCuentas:FunctionComponent<{cuentas:Cuenta[]}> = ({cuentas}) => {
  return <>
    {cuentas.map(({id,name}) => {
      return <Cuenta key={id} name={name} id={id} />
    })}
  </>
}

const Cuenta:FunctionComponent<{name:string,id:string}> = ({name,id}) => {
	const navigate = useNavigate()
  const { cliente } = useParams()

	const handler:MouseEventHandler = (e) => {
		navigate(`/${cliente}/cuentas/${id}`, {replace:true})
	}
	
  return <div key={id} className="cuenta" onClick={handler}>
    <h3>{name}</h3>
    <p>Nro: {id}</p>
  </div>
}