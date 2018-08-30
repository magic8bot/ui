import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { AppStore, StrategyConfig } from '../app.store'
import { Flex, Card, Title, Balance, Page, InputGroup, Button, Select, TitleCard, Link } from '../../ui'
import { RouterStore } from 'mobx-react-router'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Column } from '../../ui/row'
import { Strategy } from './Strategy'
import { observable } from 'mobx'
import { match } from 'react-router'

interface Params {
  exchange: string
}

interface Props {
  appStore?: AppStore
  routing?: RouterStore
  match?: match<Params>
}

@inject('appStore', 'routing')
@observer
export class BotConfig extends Component<Props> {
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

  private exchange: string = null

  public render() {
    if (!this.props.appStore.exchanges) return null

    this.exchange = this.props.match.params.exchange
    const titleChildren = this.renderTitleChildren()
    const title = this.exchange[0].toUpperCase() + this.exchange.slice(1)
    const subtitle = this.props.appStore.exchanges[this.exchange].description
    const icon = faChevronLeft
    const link = '/bots'

    const props = { title, subtitle, titleChildren, icon, link }

    return (
      <Page {...props}>
        {this.renderBalances()}
        {this.renderStrategies()}
      </Page>
    )
  }

  private renderTitleChildren() {
    const symbols = this.getSymbols()
    const strategies = this.getStrategies()

    return (
      <InputGroup alignment="end">
        <Select placeholder="Select Symbol..." options={symbols} value={this.selectedSymbol} onChange={this.selectSymbol} />

        <Select isDisabled={!this.selectedSymbol} placeholder="Select Strategy..." options={strategies} value={this.selectedStrategy} onChange={this.selectStrategy} />

        <Button isOutline color="success" onClick={this.addStrategy}>
          Add Strategy
        </Button>
      </InputGroup>
    )
  }

  private renderBalances() {
    if (!this.props.appStore.balances[this.exchange]) return null

    const balances = Object.entries(this.props.appStore.balances[this.exchange])
      .map(([coin, { total: balance }]) => ({ coin, balance }))
      .sort(({ coin: a }, { coin: b }) => (a > b ? 1 : -1))

    const fiatList = ['USD', 'EUR', 'GBP']

    const fiats = balances.filter(({ coin }) => fiatList.includes(coin))
    const coins = balances.filter(({ coin }) => !fiatList.includes(coin))

    return (
      <Card>
        <Title>Balances</Title>
        <Flex>
          {[...fiats, ...coins].map(({ coin, balance }) => (
            <Balance key={coin} coin={coin} balance={balance} />
          ))}
        </Flex>
      </Card>
    )
  }

  private renderStrategies() {
    if (!this.props.appStore.config) return null

    const strategies = this.props.appStore.config.exchanges.find(({ exchange }) => exchange === this.exchange).strategies

    return strategies.map(({ exchange, strategy, symbol }, idx) => {
      const { description } = this.props.appStore.strategies[strategy]
      const title = `${strategy} - ${symbol}`
      return (
        <TitleCard key={idx} titleSize={2} title={title} subtitle={description}>
          <Flex>
            <Link to={`/bots/${exchange}/${strategy}/${symbol.replace('/', '-')}`}>
              <Button isOutline>Edit Strategy</Button>
            </Link>
          </Flex>
        </TitleCard>
      )
    })
  }

  private getSymbols() {
    if (!this.props.appStore.symbols[this.exchange]) return []

    return this.props.appStore.symbols[this.exchange].map((symbol) => ({ value: symbol, label: symbol }))
  }

  private selectSymbol = (value) => {
    if (this.selectedSymbol && value.value === this.selectedSymbol.value) return
    this.selectedStrategy = null
    this.selectedSymbol = value
  }

  private getStrategies() {
    if (!this.selectedSymbol || !this.props.appStore.strategies) return []
    const strategyNames = Object.keys(this.props.appStore.strategies)

    const configuredExchange = this.props.appStore.config.exchanges.find(({ exchange }) => exchange === this.exchange)

    const configuredStrategies = configuredExchange.strategies.map(({ strategy, symbol }) => ({ strategy, symbol }))

    return strategyNames
      .filter((strategy) => {
        return !configuredStrategies.find((s) => s.strategy === strategy && s.symbol === this.selectedSymbol.value)
      })
      .map((name) => ({ value: name, label: name }))
  }

  private selectStrategy = (value) => {
    if (this.selectedStrategy && value.value === this.selectedStrategy.value) return
    this.selectedStrategy = value
  }

  private addStrategy = () => {
    if (!this.selectedStrategy || !this.selectedSymbol) return
    const strategy = this.props.appStore.strategies[this.selectedStrategy.value].fields.reduce(
      (acc, field) => {
        acc[field.name] = field.default
        return acc
      },
      {
        strategy: this.selectedStrategy.value,
        symbol: this.selectedSymbol.value,
      }
    )

    this.props.appStore.addStrategy(this.exchange, strategy as StrategyConfig)
    this.selectedStrategy = null
    this.selectedSymbol = null
  }
}
