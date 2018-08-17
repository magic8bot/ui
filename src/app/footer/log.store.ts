import { observable, action, computed } from 'mobx'

export interface LogType {
  time: string
  type: 'sent' | 'received' | 'error'
  msg: string
}

export class LogStore {
  @observable
  private _logs: LogType[] = []

  @computed
  public get logs(): LogType[] {
    return this._logs
      .slice(0)
      .reverse()
      .slice(0, 25)
      .reverse()
  }

  @action
  public addSent(msg: string) {
    const time = new Date().toISOString()
    this._logs.push({ time, type: 'sent', msg })
  }

  @action
  public addRec(msg: string) {
    const time = new Date().toISOString()
    this._logs.push({ time, type: 'received', msg })
  }

  @action
  public addError(msg: string) {
    const time = new Date().toISOString()
    this._logs.push({ time, type: 'error', msg: `error ${msg}` })
  }
}

export const logStore = new LogStore()
