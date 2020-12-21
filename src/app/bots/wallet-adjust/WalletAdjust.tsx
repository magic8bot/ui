import React, { Component } from 'react'

import { autorun, computed, observable, reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import { match } from 'react-router'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { Input, Card, Page, Wallet, Flex, Button } from '../../../ui'
import { AppStore } from '../../app.store'
import { BotStore } from '..'
import { ExchangeStore } from '../../exchanges'

interface Params {
  exchange: string
  strategy: string
  symbol: string
}

interface Props {
  appStore?: AppStore
  botStore?: BotStore
  exchangeStore?: ExchangeStore
  routing?: RouterStore
  match?: match<Params>
}

@inject('appStore', 'routing', 'botStore', 'exchangeStore')
@observer
export class WalletAdjust extends Component<Props> {
  @observable
  private exchange: string = null
  @observable
  private strategy: string = null
  @observable
  private symbol: string = null

  @computed
  private get asset() {
    return this.props.botStore.wallets.get(this.exchange).get(this.symbol).get(this.strategy).asset
  }

  @computed
  private get currency() {
    return this.props.botStore.wallets.get(this.exchange).get(this.symbol).get(this.strategy).currency
  }

  @computed
  private get exchangeAsset() {
    const balances = this.props.exchangeStore.balances.get(this.exchange)
    if (!balances) return 0

    const [a] = this.symbol.split('/')
    return (balances[a] || { total: 0 }).total
  }

  @computed
  private get exchangeCurrency() {
    const balances = this.props.exchangeStore.balances.get(this.exchange)
    if (!balances) return 0

    const [_, c] = this.symbol.split('/')
    return (balances[c] || { total: 0 }).total
  }

  @observable
  private adjustment: {
    asset: number
    currency: number
  } = {
    asset: 0,
    currency: 0,
  }

  async componentDidMount() {
    const { botStore, exchangeStore } = this.props
    const { exchange, strategy, symbol } = this.props.match.params

    this.exchange = exchange
    this.strategy = strategy
    this.symbol = symbol.replace('-', '/')

    await botStore.getWallet(exchange, this.symbol, strategy)
    await exchangeStore.getBalance(exchange)
  }

  private updateWallet = async () => {
    await this.props.botStore.updateWallet(this.exchange, this.symbol, this.strategy, this.adjustment)
    this.adjustment.asset = 0
    this.adjustment.currency = 0
  }

  private renderContent() {
    if (this.asset === null || this.currency === null || this.exchangeAsset === null || this.exchangeCurrency === null)
      return null

    const maxAsset = (this.exchangeAsset - this.asset).toLocaleString('fullwide')
    const maxCurrency = (this.exchangeCurrency - this.currency).toLocaleString('fullwide')
    const minAsset = this.asset.toLocaleString('fullwide')
    const minCurrency = this.currency.toLocaleString('fullwide')

    return (
      <>
        <Card>{this.renderBalances()}</Card>
        <Card>
          <form>
            <fieldset>
              <h3>Wallet Adjustment</h3>
              <div>
                <Input
                  initValue={String(this.adjustment.asset)}
                  label="Asset"
                  onChange={(value) => (this.adjustment.asset = Number(value))}
                  type="number"
                  help={`Enter a positive number to increase the wallet asset balance up to a maximum of ${maxAsset}. Enter a negative number to decrease the wallet asset up to ${minAsset}`}
                />
              </div>
              <div>
                <Input
                  initValue={String(this.adjustment.currency)}
                  label="Currency"
                  onChange={(value) => (this.adjustment.currency = Number(value))}
                  type="number"
                  help={`Enter a positive number to increase the wallet currency balance up to a maximum of ${maxCurrency}. Enter a negative number to decrease the wallet currency up to ${minCurrency}`}
                />
              </div>
              <Flex alignment="end">
                <Button isOutline onClick={this.updateWallet}>
                  Adjust Wallet
                </Button>
              </Flex>
            </fieldset>
          </form>
        </Card>
      </>
    )
  }

  private renderBalances() {
    if (!this.props.exchangeStore.balances.has(this.exchange)) return null
    const [a, c] = this.symbol.split('/')

    return (
      <Flex>
        <div>
          <h3>Total Balance</h3>

          <Wallet asset={a} currency={c} assetBalance={this.exchangeAsset} currencyBalance={this.exchangeCurrency} />
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3>Wallet Balance</h3>

          <Wallet asset={a} currency={c} assetBalance={Number(this.asset)} currencyBalance={Number(this.currency)} />
        </div>
      </Flex>
    )
  }

  public render() {
    if (
      !this.props.appStore.strategyList.size ||
      !this.exchange ||
      !this.strategy ||
      !this.symbol ||
      !this.props.appStore.strategyList.has(this.strategy)
    ) {
      return null
    }

    const title = `${this.exchange[0].toUpperCase()}${this.exchange.slice(1)} - ${
      this.symbol
    } - ${this.strategy.toUpperCase()}`
    const subtitle = this.props.appStore.strategyList.get(this.strategy).description
    const icon = faChevronLeft
    const link = `/bots/${this.exchange}`

    const props = { title, subtitle, icon, link }

    return <Page {...props}>{this.renderContent()}</Page>
  }
}
