const express = require('express');
const dotenv = require('dotenv');
const { createAccount, getAccount, makeTransfer, getClientProcedures } = require('./clients');
const cors = require('cors');

/* CURL COMMANDS
curl -XGET -H "Content-type: application/json" -d '{"key":"<key>"}' 'http://localhost:3001/123'
curl -XPOST -H "Content-type: application/json" 'http://localhost:3001/cliente/nueva/transferencia?monto=1&origen=malta&destino=argentina'
*/

dotenv.config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors())


// Cuentas bancarias de un cliente.
app.get('/:cliente', async (req, res) => {
	const accounts = await getClientProcedures(req.params.cliente, 'accounts')
	res.json({list: accounts})
});


// Transferencias realizadas por un cliente.
app.get('/:cliente/transferencias', async (req, res) => {
	const transfers = await getClientProcedures(req.params.cliente, 'transfers')
	res.json({list:transfers})
});


// Información de una cuenta y un cliente específico.
app.get('/:cliente/:cuenta', async (req, res) => {
	const account = await getAccount(req.params.cliente, req.params.cuenta)
	res.json(account)
});


// Nueva cuenta. &Queries&: monto, tipo
app.post('/:cliente/nueva/cuenta', async (req, res) => {
	const { monto, tipo } = req.query
	if (tipo !== "ahorro" && tipo !== "corriente") return res.json({state: 'wrong queries'})
	
	const state = await createAccount(req.params.cliente, parseInt(monto), tipo)

	res.status(state ? 201 : 400)
	return res.json({ state })
})


// Nueva transferencia entre dos cuentas propias. &Queries&: monto, origen, destino.
app.post('/:cliente/nueva/transferencia', async (req, res) => {
	try {
		const data = {
			amount: parseInt(req.query.monto),
			from: req.query.origen,
			to: req.query.destino
		}
		const state = await makeTransfer(req.params.cliente, data)
		return res.json({ state })
	} catch(err) {
		res.status(400)
		return res.json({state:"wrong queries"})
	}
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`))