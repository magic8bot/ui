import { observable } from 'mobx'
import { API } from '../lib'

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

export interface ExchangeOption {
  name: string
  fields: Field[]
  description: string
}

interface StrategyOption {
  name: string
  fields: FieldInput[]
  description: string
}

export class AppStore {
  @observable
  public exchangeList: Map<string, ExchangeOption> = new Map()
  @observable
  public strategyList: Map<string, StrategyOption> = new Map()

  public async loadLists() {
    const requests = ['exchange', 'strategy'].map((type) => API.get<any[]>(`/${type}/list`))
    const [exchanges, strategies] = await Promise.all(requests)

    exchanges.forEach((exchange) => this.exchangeList.set(exchange.name, exchange))
    strategies.forEach((strategy) => this.strategyList.set(strategy.name, strategy))
  }
}

export const appStore = new AppStore()
