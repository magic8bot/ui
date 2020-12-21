import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { match } from 'react-router'
import { RouterStore } from 'mobx-react-router'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { AppStore } from '../../app.store'
import { Flex, Card, Title, Balance, Page, InputGroup, Button, Select } from '../../../ui'
import { ExchangeStore } from '../../exchanges'
import { BotStore, BotConfig } from '../bot.store'
import { Row, Column } from '../../../ui/row'
import { SymbolCard } from './symbol-card'

interface Params {
  exchange: string
}

interface Props {
  appStore?: AppStore
  exchangeStore?: ExchangeStore
  botStore?: BotStore
  routing?: RouterStore
  match?: match<Params>
}

@inject('appStore', 'exchangeStore', 'botStore', 'routing')
@observer
export class ExchangeConfig extends Component<Props> {
  @observable
  private selectedSymbol: {
    value: string
    label: string
  } = null

  @observable
  private selectedStrategy: {
    value: string
    label: string
  } = null

  @observable
  private exchange: string = null

  public async componentDidMount() {
    this.exchange = this.props.match.params.exchange
    await this.props.botStore.getStrategies(this.exchange)
    await this.props.exchangeStore.getBalance(this.exchange)
  }

  public render() {
    if (
      !this.exchange ||
      !this.props.appStore.exchangeList.size ||
      !this.props.appStore.exchangeList.has(this.exchange)
    )
      return null

    const titleChildren = this.renderTitleChildren()
    const title = this.exchange[0].toUpperCase() + this.exchange.slice(1)
    const subtitle = this.props.appStore.exchangeList.get(this.exchange).description
    const icon = faChevronLeft
    const link = '/bots'

    const props = { title, subtitle, titleChildren, icon, link }

    return (
      <Page {...props}>
        {this.renderBalances()}
        {this.renderSymbols()}
      </Page>
    )
  }

  private renderTitleChildren() {
    const symbols = this.getSymbols()
    const strategies = this.getBots()

    return (
      <InputGroup alignment="end">
        <Select
          placeholder="Select Symbol..."
          options={symbols}
          value={this.selectedSymbol}
          onChange={this.selectSymbol}
        />

        <Select
          isDisabled={!this.selectedSymbol}
          placeholder="Select Strategy..."
          options={strategies}
          value={this.selectedStrategy}
          onChange={this.selectStrategy}
        />

        <Button isOutline color="success" onClick={this.addStrategy}>
          Add Strategy
        </Button>
      </InputGroup>
    )
  }

  private renderBalances() {
    if (!this.props.exchangeStore.balances.get(this.exchange)) return null

    const balances = Object.entries(this.props.exchangeStore.balances.get(this.exchange))
      .map(([coin, { total: balance }]) => ({ coin, balance }))
      .filter(({ balance }) => Boolean(balance))
      .sort(({ coin: a }, { coin: b }) => (a > b ? 1 : -1))

    const fiatList = ['USD', 'EUR', 'GBP']
    const fiats = balances.filter(({ coin }) => fiatList.includes(coin))
    const coins = balances.filter(({ coin }) => !fiatList.includes(coin))

    return (
      <Card>
        <Title size={2}>Exchange Balance</Title>
        <Flex>
          {[...fiats, ...coins].map(({ coin, balance }) => (
            <Balance key={coin} coin={coin} balance={balance} />
          ))}
        </Flex>
      </Card>
    )
  }

  private renderSymbols() {
    if (!this.props.botStore.bots.has(this.exchange)) return null

    const symbols = [...this.props.botStore.bots.get(this.exchange).keys()]

    return (
      <Row isWrap noPadding>
        {symbols.map((symbol) => {
          return (
            <Column key={symbol} size={25}>
              <SymbolCard exchange={this.exchange} symbol={symbol} />
            </Column>
          )
        })}
      </Row>
    )
  }

  private getSymbols() {
    if (!this.props.exchangeStore.symbols.has(this.exchange)) return []

    return this.props.exchangeStore.symbols.get(this.exchange).map((symbol) => ({ value: symbol, label: symbol }))
  }

  private selectSymbol = (value) => {
    if (this.selectedSymbol && value.value === this.selectedSymbol.value) return
    this.selectedStrategy = null
    this.selectedSymbol = value
  }

  private getBots() {
    if (!this.selectedSymbol || !this.props.appStore.strategyList) return []
    const strategyNames = Array.from(this.props.appStore.strategyList.keys())

    const configuredStrategies = this.props.botStore.getBots(this.exchange, this.selectedSymbol.value)

    return strategyNames
      .filter((strategy) => !configuredStrategies.find((s) => s === strategy))
      .map((name) => ({ value: name, label: name }))
  }

  private selectStrategy = (value) => {
    if (this.selectedStrategy && value.value === this.selectedStrategy.value) return
    this.selectedStrategy = value
  }

  private addStrategy = () => {
    if (!this.selectedStrategy || !this.selectedSymbol) return
    const strategy = this.props.appStore.strategyList.get(this.selectedStrategy.value).fields.reduce(
      (acc, field) => {
        acc[field.name] = field.default
        return acc
      },
      {
        exchange: this.exchange,
        strategy: this.selectedStrategy.value,
        symbol: this.selectedSymbol.value,
      }
    )
    this.props.botStore.addStrategy(strategy as BotConfig)
    this.selectedStrategy = null
    this.selectedSymbol = null
  }
}
