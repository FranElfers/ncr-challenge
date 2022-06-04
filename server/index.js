const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express()
const { createAccount, getAccount, makeTransfer, getClientProcedures } = require('./clients');
const PORT = 3001

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
// ┃ Cliente: foo                                                             ┃
// ┃ GET -> Cuentas bancarias:[]                                              ┃
// ┃ http://localhost:3001/foo                                                ┃
// ┃ GET -> Transferencias:[]                                                 ┃
// ┃ http://localhost:3001/foo/transferencias                                 ┃
// ┃ GET -> Detalle de cuenta:{}                                              ┃
// ┃ http://localhost:3001/foo/795384                                         ┃
// ┃ POST -> Crear cuenta                                                     ┃
// ┃ http://localhost:3001/foo/nueva/cuenta?monto=10&tipo=ahorro              ┃
// ┃ POST -> Hacer transferencia                                              ┃
// ┃ http://localhost:3001/foo/nueva/cuenta?monto=10&origen=482&destino=421   ┃
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

dotenv.config()
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
	console.log(state)
	
	res.status(state ? 201 : 400)
	if (state === 405) res.status(state)

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


const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

// Para cerrar el server en testing
module.exports = server