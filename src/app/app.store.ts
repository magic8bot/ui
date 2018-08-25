import { observable } from 'mobx'
import { wsClient } from '../lib'

interface FieldBase {
  name: string
}

type FieldNodeBase = FieldBase & {
  prettyName: string
  description: string
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
  public strategies: string[] = null

  constructor() {
    wsClient.registerAction('get-my-config', (config: Config) => {
      this.config = config
    })

    wsClient.registerAction('get-exchanges', ({ exchanges }) => {
      this.exchanges = exchanges
    })

    wsClient.registerAction('get-strategies', ({ strategies }) => {
      this.strategies = strategies
    })
  }

  public loadAll() {
    wsClient.broadcast('get-my-config')
    wsClient.broadcast('get-exchanges')
    wsClient.broadcast('get-strategies')
  }

  public saveExchange(exchangeConfig: ExchangeConfig) {
    wsClient.broadcast('update-exchange', exchangeConfig)
  }
}

export const appStore = new AppStore()
