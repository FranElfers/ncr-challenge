export const SERVER_URL = "http://localhost:3001"

// Shorthands
type S = string | undefined
const fetchServer = (url:string) => fetch(`${SERVER_URL}${url}`)
		.then(res => res.json())
// Shorthands

export const getTransfers = (client:S) => {
	const sortByDate = (list:{timestamp:string}[]):any[] => {
		return list.sort((a,b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf())
	}

	return fetchServer(`/${client}/transferencias`)
		.then(res => sortByDate(res.list))
}

export const getAccount = (client:S, acc:S) => fetchServer(`/${client}/${acc}`)

export const getAccounts = (client:S):Promise<any[]> => fetchServer(`/${client}`).then(res => res.list)

export const newTransfer = (client:S, amount:S, from:S, to:S) => {
	const url = `/${client}/nueva/transferencia?monto=${amount}&origen=${from}&destino=${to}`
	return fetch(SERVER_URL+url, {method:"POST"})
}

export const newAccount = (client:S, type:S) => {
	const url = `/${client}/nueva/cuenta?monto=10&tipo=${type}`
	return fetch(SERVER_URL+url, {method:"POST"})
}