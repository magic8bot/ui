import { observable } from 'mobx'
import { wsClient } from '../../../lib'

interface Exchange {
  [key: string]: any
}

export class ExchangeStore {
  @observable
  public exchanges: Exchange[] = []

  constructor() {
    wsClient.registerAction('get-exchanges', (exchanges: Exchange[]) => {
      this.exchanges = exchanges
    })
  }

  public loadAll() {
    wsClient.broadcast('get-exchanges', null)
  }
}

export const exchangeStore = new ExchangeStore()
