import { Link } from "react-router-dom"
import Transferencias from "./Transferencias"

const Dashboard = () => {
	return <>
		<h3>Dashboard</h3>
		<Link to="/fran/cuentas"replace={true}>Cuentas</Link>
		<h4>Transferencias</h4>
		<Transferencias />
	</>
}

export default Dashboard