const Redis = require('redis');
const redis = Redis.createClient()
redis.connect()

/** Obtiene una lista de la base de datos */
const getList = async (client, type) => await redis.lRange(`${client}:${type}`, 0, -1)

/** Crear una cuenta */
async function createAccount(client, amount, type) {
	const completeType = amount === 'ahorro' ? "Cuenta de ahorro" : "Cuenta corriente"
	const accountData = {
		balance: amount,
		cbu: 123123,
		name: completeType,
		client
	}
	return await upload(`${client}:accounts`, accountData)
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
	return await upload(`${client}:transfers`, {
		timestamp: new Date(),
		...transfer
	})
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
		
		await redis.set(id || "1", data)
		await redis.rPush(key, id || "1")

		return true
	} catch (err) {
		console.log('redis upload failed', err)
		return false
	}
}

module.exports = {
	createAccount,
	getAccount,
	getClientProcedures,
	makeTransfer,
	upload	
}