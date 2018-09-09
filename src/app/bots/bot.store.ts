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
}

export class BotStore {
  @observable
  public bots: Map<string, Map<string, Map<string, BotConfig>>> = new Map()

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
  }

  public getBots(exchange: string, symbol: string) {
    if (!this.bots.has(exchange) || !this.bots.get(exchange).has(symbol)) return []

    return Array.from(
      this.bots
        .get(exchange)
        .get(symbol)
        .keys()
    )
  }

  @action
  private setBot(botConfig: BotConfig) {
    const { exchange, symbol, strategy } = botConfig
    if (!this.bots.has(exchange)) this.bots.set(exchange, new Map())
    if (!this.bots.get(exchange).has(symbol)) this.bots.get(exchange).set(symbol, new Map())

    const bots = this.bots.get(exchange).get(symbol)
    bots.set(strategy, botConfig)
  }
}

export const botStore = new BotStore()
