import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { AppStore } from '../../../app.store'
import { Flex, Card, Title, Button, TitleCard, Link, Toggle, Wallet } from '../../../../ui'
import { observable, reaction, IReactionDisposer, autorun, toJS } from 'mobx'
import { BotStore } from '../../bot.store'
import { ExchangeStore } from '../../../exchanges'

interface Props {
  exchange: string
  symbol: string
  appStore?: AppStore
  exchangeStore?: ExchangeStore
  botStore?: BotStore
}

@inject('appStore', 'exchangeStore', 'botStore', 'routing')
@observer
export class SymbolCard extends Component<Props> {
  @observable
  private isSyncing = false
  private asset: number
  private currency: number
  private disposer: IReactionDisposer

  constructor(props) {
    super(props)

    const { exchange, symbol } = this.props

    this.disposer = autorun(() => {
      const state = this.props.exchangeStore.getSyncState(exchange, symbol)
      this.isSyncing = !!state
    })
  }

  public async componentDidMount() {
    const { exchange, symbol } = this.props
    await this.props.exchangeStore.getSync(exchange, symbol)
  }

  public async componentWillUnmount() {
    this.disposer()
  }

  public render() {
    return (
      <div>
        <Card>
          <Title size={2}>{this.props.symbol}</Title>
          <Toggle value={this.isSyncing} onChange={this.handleSyncToggle} label="Sync Trades" />
          {this.renderBalances()}
        </Card>
        <Flex direction="col">{this.renderStrategies()}</Flex>
      </div>
    )
  }

  private handleSyncToggle = () => {
    this.isSyncing = !this.isSyncing

    const { exchange, symbol } = this.props
    this.props.exchangeStore.setSync(exchange, symbol, this.isSyncing)
  }

  private handleStrategyToggle = (exchange: string, symbol: string, strategy: string) => () => {
    const status = !this.props.botStore.isBotOn(exchange, symbol, strategy)

    this.props.botStore.setStrategy(exchange, symbol, strategy, status)
  }

  private renderStrategies() {
    if (!this.props.botStore.bots.has(this.props.exchange) || !this.props.appStore.strategyList.size) return null

    const strategies = [...this.props.botStore.bots.get(this.props.exchange).get(this.props.symbol).values()]

    return strategies.map(({ exchange, strategy, symbol }, idx) => {
      const { appStore, botStore } = this.props
      if (
        !appStore.strategyList.has(strategy) ||
        !botStore.wallets.has(exchange) ||
        !botStore.wallets.get(exchange).has(symbol) ||
        !botStore.wallets.get(exchange).get(symbol).has(strategy)
      ) {
        return null
      }

      const { asset, currency } = botStore.wallets.get(exchange).get(symbol).get(strategy)
      const [a, c] = symbol.split('/')

      const { description } = appStore.strategyList.get(strategy)
      return (
        <TitleCard key={idx} titleSize={3} title={strategy} subtitle={description}>
          <Toggle value={botStore.isBotOn(exchange, symbol, strategy)} onChange={this.handleStrategyToggle(exchange, symbol, strategy)} label="Enabled" />

          <Wallet asset={a} currency={c} assetBalance={asset} currencyBalance={currency} />
          <Flex alignment="between">
            <Link to={`/bots/${exchange}/${symbol.replace('/', '-')}/${strategy}`}>
              <Button isOutline>Edit Strategy</Button>
            </Link>

            <Link to={`/bots/${exchange}/${symbol.replace('/', '-')}/${strategy}/wallet`}>
              <Button isOutline>Edit Wallet</Button>
            </Link>
          </Flex>
        </TitleCard>
      )
    })
  }

  private renderBalances() {
    if (!this.props.exchangeStore.balances.has(this.props.exchange)) return null

    const balances = this.props.exchangeStore.balances.get(this.props.exchange)
    const [a, c] = this.props.symbol.split('/')
    this.asset = (balances[a] || { total: 0 }).total
    this.currency = (balances[c] || { total: 0 }).total

    return <Wallet asset={a} currency={c} assetBalance={this.asset} currencyBalance={this.currency} />
  }
}
