import { observable } from 'mobx'
import { wsClient } from '../lib'

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

  constructor() {
    wsClient.registerAction('get-my-config', (config: Config) => {
      console.log({ config })
      this.config = config
    })
  }

  public loadAll() {
    wsClient.broadcast('get-my-config')
  }
}

export const appStore = new AppStore()
