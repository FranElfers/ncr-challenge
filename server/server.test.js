const server = require('.');
const { createAccount, getAccount, makeTransfer, getClientProcedures, deleteDatabase, disconnectDatabase, connection } = require('./clients');

afterAll(() => {
	server.close()
	disconnectDatabase()
})

const testingClient = "tester"

test("Conectar base de datos", async ()=>{
	expect(await connection).toStrictEqual(true)
})

test("Eliminar base de datos", async ()=>{
	expect(await deleteDatabase()).toStrictEqual("FLUSHED")
})

test("Crear cuenta de ahorro", async ()=>{
	expect(await createAccount(testingClient, 10, "ahorro")).toStrictEqual(true)
})

test("Crear cuenta corriente", async ()=>{
	expect(await createAccount(testingClient, 10, "corriente")).toStrictEqual(true)
})

test("Crear 4 cuentas extras pasando el limite", async ()=>{
	expect(await createAccount(testingClient, 10, ".")).toStrictEqual(true)
	expect(await createAccount(testingClient, 10, ".")).toStrictEqual(true)
	expect(await createAccount(testingClient, 10, ".")).toStrictEqual(true)
	expect(await createAccount(testingClient, 10, ".")).toStrictEqual(405)
})

test("Obtener cuentas de un cliente", async ()=>{
	const lista = await getClientProcedures(testingClient, "accounts")
	expect(lista.length).toStrictEqual(5)
})

test("Obtener una cuenta de cliente", async ()=>{
	const account = await getAccount(testingClient, "1")
	expect(account.name).toStrictEqual("Cuenta de ahorro")
})

test("Obtener una cuenta inexistente", async ()=>{
	expect(await getAccount(testingClient, "10")).toStrictEqual(null)
})

test("Transferir $5 entre cuentas", async ()=>{
	const transfer = {
		amount: 5,
		from: "1",
		to: "2"
	}
	expect(await makeTransfer(testingClient, transfer)).toStrictEqual(true)
})

test("Transferir $5 entre cuentas inexistentes", async ()=>{
	const transfer = {
		amount: 5,
		from: "100",
		to: "101"
	}
	expect(await makeTransfer(testingClient, transfer)).toStrictEqual(false)
})

test("Obtener transferencias de cliente", async ()=>{
	const lista = await getClientProcedures(testingClient, "transfers")
	expect(lista.length).toStrictEqual(1)
})
