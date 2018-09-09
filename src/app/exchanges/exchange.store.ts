import { observable, action } from 'mobx'
import { wsClient, API } from '../../lib'

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

  @action
  public async getExchanges() {
    const exchanges = await API.get<ExchangeConfig[]>('/exchange')
    exchanges.forEach((exchange) => this.exchanges.set(exchange.exchange, exchange))

    await Promise.all(
      exchanges.map(async ({ exchange }) => {
        const symbols = await API.get<string[]>(`/exchange/symbols?exchange=${exchange}`)
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
    await API.post<ExchangeConfig>('/exchange', exchangeConfig)

    this.updateConfig(exchangeConfig)
  }

  public async updateExchange(exchangeConfig: ExchangeConfig) {
    await API.put<ExchangeConfig>('/exchange', exchangeConfig)

    this.updateConfig(exchangeConfig)
  }

  public async deleteExchange(exchange: string) {
    await API.delete<void>('/exchange', { exchange })
    this.removeExchange(exchange)
  }

  @action
  public removeExchange(exchange: string) {
    this.exchanges.delete(exchange)
  }

  public async getBalance(exchange: string) {
    const balance = await API.get<Balances>(`/exchange/balance?exchange=${exchange}`)
    this.balances.set(exchange, balance)
  }

  @action
  private updateConfig(exchangeConfig: ExchangeConfig) {
    const { exchange } = exchangeConfig
    this.exchanges.set(exchange, { ...exchangeConfig, isNew: false })
  }
}

export const exchangeStore = new ExchangeStore()
