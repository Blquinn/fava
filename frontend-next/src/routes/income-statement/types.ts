export interface IncomeStatementResponse {
  data: Data
  mtime: string
  success: boolean
}

export interface Data {
  charts: Chart[]
  date_range: unknown
  trees: Tree[]
}

export interface Chart {
  data: unknown
  label: string
  type: string
}

export interface Tree {
  account: string
  balance: Balance
  balance_children: BalanceChildren
  children: Children[]
  has_txns: boolean
}

export interface Balance {
  [currency: string]: number
}

export interface BalanceChildren {
  [currency: string]: number
}

export interface Children {
  account: string
  balance: Balance
  balance_children: BalanceChildren
  children: Children[]
  has_txns: boolean
}
