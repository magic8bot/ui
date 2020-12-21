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

export interface WalletConfig {
  asset: string
  currency: string
}

export interface BotConfig {
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
  status: boolean
}

interface Wallet {
  asset: number
  currency: number
}

export class BotStore {
  @observable
  public bots: Map<string, Map<string, Map<string, BotConfig>>> = new Map()

  @observable
  public wallets: Map<string, Map<string, Map<string, Wallet>>> = new Map()

  public isBotConfigured(exchange: string, symbol: string, strategy: string) {
    const isBotConfigured =
      this.bots.has(exchange) &&
      this.bots.get(exchange).has(symbol) &&
      this.bots.get(exchange).get(symbol).has(strategy)

    return isBotConfigured
  }

  public isBotOn(exchange: string, symbol: string, strategy: string) {
    if (!this.isBotConfigured(exchange, symbol, strategy)) return false

    return this.bots.get(exchange).get(symbol).get(strategy).status
  }

  public async getStrategies(exchange: string) {
    const bots = await API.get<BotConfig[]>(`/strategy?exchange=${exchange}`)
    bots.forEach((botConfig) => this.setBot(botConfig))
  }

  public async addStrategy(botConfig: BotConfig) {
    await API.post('/strategy', botConfig)
    this.setBot(botConfig)
  }

  public async updateStrategy(botConfig: BotConfig) {
    await API.put('/strategy', botConfig)
    this.setBot(botConfig)
  }

  public async deleteStrategy(botConfig: Partial<BotConfig>) {
    await API.delete('/strategy', botConfig)

    const { exchange, symbol, strategy } = botConfig
    const bots = this.bots.get(exchange).get(symbol)
    bots.delete(strategy)

    if (!bots.size) this.bots.get(exchange).delete(symbol)
  }

  public getBots(exchange: string, symbol: string) {
    if (!this.bots.has(exchange) || !this.bots.get(exchange).has(symbol)) return []

    return Array.from(this.bots.get(exchange).get(symbol).keys())
  }

  public async getWallet(exchange: string, symbol: string, strategy: string) {
    const wallet = await API.get<Wallet>(`/strategy/wallet?exchange=${exchange}&symbol=${symbol}&strategy=${strategy}`)
    this.setWallet(exchange, symbol, strategy, wallet)
  }

  public async updateWallet(exchange: string, symbol: string, strategy: string, wallet: Wallet) {
    const payload = { exchange, symbol, strategy, ...wallet }
    const res = await API.put<{ error: string } & Wallet>('/strategy/wallet', payload)
    if (typeof res.error !== 'undefined') return console.error(res.error)

    await this.getWallet(exchange, symbol, strategy)
  }

  @action
  public async setStrategy(exchange: string, symbol: string, strategy: string, status: boolean) {
    this.bots.get(exchange).get(symbol).get(strategy).status = status
    const result = await API.post<{ status: boolean }>(`/strategy/${status ? 'start' : 'stop'}`, {
      exchange,
      symbol,
      strategy,
    })

    this.bots.get(exchange).get(symbol).get(strategy).status = result.status
  }

  @action
  private setBot(botConfig: BotConfig) {
    const { exchange, symbol, strategy } = botConfig
    if (!this.bots.has(exchange)) this.bots.set(exchange, observable(new Map()))
    if (!this.bots.get(exchange).has(symbol)) this.bots.get(exchange).set(symbol, observable(new Map()))

    const bots = this.bots.get(exchange).get(symbol)
    bots.set(strategy, botConfig)

    this.getWallet(exchange, symbol, strategy)
  }

  @action
  private setWallet(exchange: string, symbol: string, strategy: string, wallet: Wallet) {
    if (!this.wallets.has(exchange)) this.wallets.set(exchange, observable(new Map()))
    if (!this.wallets.get(exchange).has(symbol)) this.wallets.get(exchange).set(symbol, observable(new Map()))

    const bots = this.wallets.get(exchange).get(symbol)
    bots.set(strategy, wallet)
  }
}

export const botStore = new BotStore()
