export interface Transfer {
	timestamp: string
	amount: number
	from: string
	to: string
}

export interface Account {
  id: string
  name: string
  client: string
}

export interface Details extends Account {
	balance: number
	transferencias: any
	cbu: number
}