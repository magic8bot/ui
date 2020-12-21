import { observable, action } from 'mobx'
import { API } from '../../lib'

interface FieldBase {
  name: string
}

type FieldNodeBase = FieldBase & {
  prettyName: string
  description: string
  default?: string | number | boolean
}

type FieldInput = FieldNodeBase & {
  type: 'text' | 'password' | 'number'
}

type FieldToggle = FieldNodeBase & {
  type: 'boolean'
}

type FieldSelect = FieldNodeBase & {
  type: 'select'
  options: {
    key: string
    value: string
  }[]
}

export type FieldNode = FieldInput | FieldToggle | FieldSelect

export type FieldRoot = FieldBase & {
  type: Field[]
}

export type Field = FieldRoot | FieldNode

export interface ExchangeConfig {
  exchange: string
  tradePollInterval: number
  isNew: boolean
}

export interface Config {
  exchanges: ExchangeConfig[]
}

interface Balance {
  free: number
  used: number
  total: number
}

interface Balances {
  info: any
  [key: string]: Balance
}

export class ExchangeStore {
  @observable
  public exchanges: Map<string, ExchangeConfig> = new Map()

  @observable
  public symbols: Map<string, string[]> = new Map()

  @observable
  public balances: Map<string, Balances> = new Map()

  @observable
  public syncStates: Map<string, Map<string, 0 | 1 | 2>> = new Map()

  constructor() {}

  @action
  public async getExchanges() {
    const exchanges = await API.get<ExchangeConfig[]>('/exchange')
    exchanges.forEach((exchange) => this.exchanges.set(exchange.exchange, exchange))

    await Promise.all(
      exchanges.map(async ({ exchange }) => {
        const symbols = await API.get<string[]>(`/exchange/${exchange}/symbols`)
        this.symbols.set(exchange, symbols)
      })
    )
    return this.exchanges
  }

  @action
  public addExchange(exchange: string) {
    this.exchanges.set(exchange, { exchange, tradePollInterval: 500, isNew: true })
  }

  public async saveExchange(exchangeConfig: ExchangeConfig) {
    const { exchange } = exchangeConfig
    await API.post<ExchangeConfig>(`/exchange/${exchange}`, exchangeConfig)

    this.updateConfig(exchangeConfig)
  }

  public async updateExchange(exchangeConfig: ExchangeConfig) {
    const { exchange } = exchangeConfig
    await API.put<ExchangeConfig>(`/exchange/${exchange}`, exchangeConfig)

    this.updateConfig(exchangeConfig)
  }

  public async deleteExchange(exchange: string) {
    await API.delete<void>(`/exchange/${exchange}`)
    this.removeExchange(exchange)
  }

  @action
  public removeExchange(exchange: string) {
    this.exchanges.delete(exchange)
  }

  @action
  public async getBalance(exchange: string) {
    const balance = await API.get<Balances>(`/exchange/${exchange}/balance`)
    this.balances.set(exchange, balance)
  }

  @action
  public async getSync(exchange: string, symbol: string) {
    const sync = await API.get<{ status: 0 | 1 | 2 }>(`/exchange/${exchange}/sync/${encodeURIComponent(symbol)}`)

    this.setSyncState(exchange, symbol, sync.status)
  }

  @action
  public async setSync(exchange: string, symbol: string, status: boolean) {
    API.post(`/exchange/${exchange}/sync/${encodeURIComponent(symbol)}/${status ? 'start' : 'stop'}`)
  }

  public setSyncState(exchange: string, symbol: string, status: 0 | 1 | 2) {
    if (!this.syncStates.has(exchange)) this.syncStates.set(exchange, new Map())

    this.syncStates.get(exchange).set(symbol, status)
  }

  public getSyncState(exchange: string, symbol: string) {
    return this.syncStates.has(exchange) && this.syncStates.get(exchange).get(symbol)
  }

  @action
  private updateConfig(exchangeConfig: ExchangeConfig) {
    const { exchange } = exchangeConfig
    this.exchanges.set(exchange, { ...exchangeConfig, isNew: false })
  }
}

export const exchangeStore = new ExchangeStore()
