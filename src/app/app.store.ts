import { observable, action } from 'mobx'
import { wsClient } from '../lib'

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

type ExchangeOptions = Record<
  string,
  {
    fields: Field[]
    description: string
  }
>

type StrategyOptions = Record<
  string,
  {
    fields: FieldInput[]
    description: string
  }
>

export interface WalletConfig {
  asset: string
  currency: string
}

export interface StrategyConfig {
  days: number
  exchange: string
  markDn: number
  markUp: number
  orderPollInterval: number
  orderSlippageAdjustmentTolerance: number
  period: string
  strategy: string
  symbol: string
  wallet: WalletConfig
}

export interface ExchangeConfig {
  exchange: string
  strategies: StrategyConfig[]
  tradePollInterval: number
  isNew: boolean
}

export interface Config {
  exchanges: ExchangeConfig[]
}

export class AppStore {
  @observable
  public config: Config = null
  @observable
  public exchanges: ExchangeOptions = null
  @observable
  public strategies: StrategyOptions = null
  @observable
  public symbols: Record<string, string[]> = {}
  @observable
  public balances: Record<string, Record<string, { total: number }>> = {}

  constructor() {
    wsClient.registerAction('get-my-config', (config: Config) => {
      this.config = config
      config.exchanges.forEach(({ exchange }) => {
        wsClient.broadcast('get-symbols', { exchange })
        wsClient.broadcast('get-balance', { exchange })
      })
    })

    wsClient.registerAction('get-exchanges', ({ exchanges }) => {
      this.exchanges = exchanges
    })

    wsClient.registerAction('get-strategies', ({ strategies }) => {
      this.strategies = strategies
    })

    wsClient.registerAction('get-symbols', ({ exchange, symbols }) => {
      this.symbols[exchange] = symbols
    })

    wsClient.registerAction('get-balance', ({ exchange, balance }) => {
      this.balances[exchange] = Object.entries(balance).reduce((acc, [key, value]) => {
        // @ts-ignore
        if (!value.total) return acc
        acc[key] = value
        return acc
      }, {})
    })
  }

  public loadAll() {
    wsClient.broadcast('get-my-config')
    wsClient.broadcast('get-exchanges')
    wsClient.broadcast('get-strategies')
  }

  @action
  public addExchange(exchange: string) {
    this.config.exchanges.push({ exchange, strategies: [], tradePollInterval: 500, isNew: true })
  }

  public saveExchange(exchangeConfig: ExchangeConfig) {
    wsClient.broadcast('add-exchange', exchangeConfig)
  }

  public updateExchange(exchangeConfig: ExchangeConfig) {
    wsClient.broadcast('update-exchange', exchangeConfig)
  }

  public async deleteExchange(name: string) {
    wsClient.broadcast('delete-exchange', { exchange: name })

    await wsClient.once('delete-exchange', () => {
      const idx = this.config.exchanges.findIndex(({ exchange }) => exchange === name)
      this.config.exchanges.splice(idx, 1)
    })
  }

  public removeExchange(name: string) {
    const idx = this.config.exchanges.findIndex(({ exchange }) => exchange === name)
    this.config.exchanges.splice(idx, 1)
  }

  @action
  public addStrategy(exchange: string, strategyConfig: StrategyConfig) {
    const exchangeConfig = this.config.exchanges.find(({ exchange: name }) => name === exchange)
    exchangeConfig.strategies.push({ exchange, ...strategyConfig })
    wsClient.broadcast('add-strategy', { exchange, ...strategyConfig })
  }

  public updateStrategy(strategyConfig: StrategyConfig) {
    wsClient.broadcast('update-strategy', strategyConfig)
  }

  public async deleteStrategy(exchange: string, strategy: string, symbol: string) {
    wsClient.broadcast('delete-strategy', { exchange, strategy, symbol })

    await wsClient.once('delete-strategy', () => {
      const exchangeConfig = this.config.exchanges.find(({ exchange: name }) => name === exchange)
      const idx = exchangeConfig.strategies.findIndex(({ strategy: strategyName, symbol: symbolName }) => strategyName === strategy && symbolName === symbol)
      setTimeout(() => {
        exchangeConfig.strategies.splice(idx, 1)
      }, 20)
    })
  }
}

export const appStore = new AppStore()
