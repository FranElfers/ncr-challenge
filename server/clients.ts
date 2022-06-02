type Client = string
type AccountID = number

interface Account {
	id: AccountID
	name: string
	client: Client
}

interface Transfer {
	client: Client
	amount: number
	from: AccountID
	to: AccountID
}

/**
 * Obtiene una cuenta de un cliente
 * @param client ClientName
 * @param id AccountID
 * @returns Datos de la cuenta
 */
export function getAccount(client:Client, id:string):Account {

	return {
		id: parseInt(id),
		name: '',
		client
	}
}

/**
 * Obtiene todas las cuentas de un cliente
 * @param client ClientName
 * @returns Lista de datos de todas las cuentas
 */
export function getAccounts(client:Client):Account[] {
	return [getAccount(client,"1"), getAccount(client,"2")]
}

/**
 * Obtiene las transferencias de un cliente
 * @param client ClientName
 * @returns Lista de todas las transferencias
 */
export function getTransfers(client:Client):Transfer[] {
	return [
		{
			client,
			amount: 12,
			from: 1123,
			to: 123123
		}
	]
}

/**
 * Realiza una transferencia entre dos cuentas de un cliente
 * @param transfer :{ monto, origen, destino }
 * @returns Estado de transferencia
 */
export function makeTransfer(transfer:Transfer):boolean {

	return true
}