const Redis = require('redis');
const redis = Redis.createClient()
console.log('connecting to redis')

redis.connect().catch(err => {
	console.log('error connecting')
})

/** Obtiene una lista de la base de datos */
const getList = async (client, type) => await redis.lRange(`${client}:${type}`, 0, -1)

/** Crear una cuenta */
async function createAccount(client, amount, type) {
	const completeType = type === 'ahorro' ? "Cuenta de ahorro" : "Cuenta corriente"
	const accountData = {
		balance: amount,
		cbu: CBUGenerator(),
		name: completeType,
		client
	}

	// Checkear cantidad de cuentas
	const accountList = await getList(client, "accounts")
	if (accountList.length >= 5) return 405

	return upload(`${client}:accounts`, accountData)
}


/** Obtiene una cuenta de un cliente */
async function getAccount(client, id) {
	const accountIDs = await getList(client,'accounts')
	if (!accountIDs.includes(id)) return null

	const account = await redis.get(id)
	if (!account) return null
	
	return JSON.parse(account)
}


/** Obtiene cuentas o transferencias del cliente */
async function getClientProcedures(client, type) {
	const procedureIDs = await getList(client, type)
	const procedures = []

	for (const id of procedureIDs) {
		const call = await redis.get(id)
		if (!call) continue

		procedures.push({id, ...JSON.parse(call)})
	}
	
	return procedures
}


/** Realiza una transferencia entre dos cuentas de un cliente */
async function makeTransfer(client,transfer) {

	const fran = async (direction) => {
		// Cambiar saldo en origen
		const accountCall = await redis.get(transfer[direction])
		if (!accountCall) return false
		const account = JSON.parse(accountCall)
		const amount = ({from:-transfer.amount, to:transfer.amount})[direction]
		
		account.balance = account.balance + amount

		await redis.set(transfer[direction], JSON.stringify(account))
		// .then(console.log)
		// .catch(console.log)
		return true
	}

	if (await fran("from") && await fran("to")) return upload(`${client}:transfers`, {
		timestamp: new Date(),
		...transfer
	})

	return false
}


/** Sube una nueva transferencia o nueva cuenta */
async function upload(key,data) {
	data = JSON.stringify(data)
	try {
		const id = await redis.get('key')

		if (!id) {
			await redis.set('key', "1")
		} else {
			await redis.incr('key')
		}
		const newId = await redis.get('key')
		await redis.set(newId, data)
		await redis.rPush(key, newId)

		return true
	} catch (err) {
		console.log('redis upload failed', err)
		return false
	}
}

function CBUGenerator() {
	let output = ""

	while (output.length < 22)
		output += Math.floor(Math.random() *10)

	return output
}

/** DANGER */
function deleteDatabase() {
	return redis.flushAll().then(() => 'FLUSHED')
}
function disconnectDatabase() {
	return redis.disconnect()
}

module.exports = {
	createAccount,
	getAccount,
	getClientProcedures,
	makeTransfer,
	deleteDatabase,
	disconnectDatabase
}