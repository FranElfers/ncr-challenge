import { Link } from "react-router-dom"
import Transferencias from "./components/Transferencias"

const Dashboard = () => {
	return <>
		<h3>Dashboard</h3>
		<Link to="/:cliente/cuentas"replace={true}>Cuentas</Link>
		<h4>Ultimas 5 ransferencias</h4>
		<Transferencias />
	</>
}

export default Dashboard