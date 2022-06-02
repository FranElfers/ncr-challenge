import express, { Express, Request, Response } from 'express';
import Redis from 'redis';
import dotenv from 'dotenv';
import { getAccount, getAccounts, getTransfers, makeTransfer } from './clients';
import cors from 'cors'

/* CURL COMMANDS
curl -XGET -H "Content-type: application/json" -d '{"key":"<key>"}' 'http://localhost:3001/123'
curl -XPOST -H "Content-type: application/json" 'http://localhost:3001/123?monto=1&origen=malta&destino=argentina'
*/

dotenv.config()

const PORT = process.env.PORT || 3001
const app: Express = express()

app.use(express.json())
app.use(cors())

interface Params<T=null> {
	cliente: string
	cuenta: T
}

// Cuentas bancarias de un cliente. Parámetros obligatorios: número de cliente.
app.get('/:cliente', (req: Request<Params>, res: Response) => {
	const accounts = getAccounts(req.params.cliente)
	res.json({list: accounts})
});


// Transferencias realizadas por un cliente. Parámetros obligatorios: número cliente.
app.get('/:cliente/transferencias', (req: Request<Params>, res: Response) => {
	const transfers = getTransfers(req.params.cliente)
	res.json({list:transfers})
});


// Información de una cuenta y un cliente específico. Parámetros obligatorios: número cliente, número de cuenta.
app.get('/:cliente/:cuenta', (req: Request<Params<string>>, res: Response) => {
	const account = getAccount(req.params.cliente, req.params.cuenta)
	res.json(account)
});


// Nueva transferencia entre dos cuentas propias. Parámetros obligatorios: monto, cuenta origen, cuenta destino.
interface Transfer {
	monto: string
	origen: string
	destino: string
}

type TransferReq = Request<Params, unknown, unknown, Transfer>

app.post('/:cliente', (req: TransferReq, res: Response) => {
	const data = {
		client: req.params.cliente,
		amount: parseInt(req.query.monto || "0"),
		from: parseInt(req.query.origen || "0"),
		to: parseInt(req.query.destino || "0")
	}
	
	const state = makeTransfer(data)
  res.json({state})
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))