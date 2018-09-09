import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { AppStore } from '../../app.store'
import { RouterStore } from 'mobx-react-router'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { StrategyConfig } from './StrategyConfig'
import { match } from 'react-router'
import { Page } from '../../../ui'
import { BotStore } from '../bot.store'
import { observable } from 'mobx'

interface Params {
  exchange: string
  strategy: string
  symbol: string
}

interface Props {
  appStore?: AppStore
  botStore?: BotStore
  routing?: RouterStore
  match?: match<Params>
}

@inject('appStore', 'routing', 'botStore')
@observer
export class StrategyConfigContainer extends Component<Props> {
  @observable
  private exchange: string = null
  @observable
  private strategy: string = null
  @observable
  private symbol: string = null

  public componentDidMount() {
    const { exchange, strategy, symbol } = this.props.match.params

    this.exchange = exchange
    this.strategy = strategy
    this.symbol = symbol.replace('-', '/')

    const { bots } = this.props.botStore

    if (
      !bots.size ||
      !bots.has(this.exchange) ||
      !bots.get(this.exchange).has(this.symbol) ||
      !bots
        .get(this.exchange)
        .get(this.symbol)
        .has(this.strategy)
    ) {
      return this.props.botStore.getStrategies(this.exchange)
    }
  }

  public render() {
    if (!this.props.appStore.strategyList.size || !this.exchange || !this.strategy || !this.symbol) {
      return null
    }

    const title = `${this.exchange[0].toUpperCase()}${this.exchange.slice(1)} - ${this.symbol} - ${this.strategy.toUpperCase()}`
    const subtitle = this.props.appStore.strategyList.get(this.strategy).description
    const icon = faChevronLeft
    const link = `/bots/${this.exchange}`

    const props = { title, subtitle, icon, link }

    return <Page {...props}>{this.renderStrategy()}</Page>
  }

  private renderStrategy() {
    const { bots } = this.props.botStore

    if (
      !bots.size ||
      !bots.has(this.exchange) ||
      !bots.get(this.exchange).has(this.symbol) ||
      !bots
        .get(this.exchange)
        .get(this.symbol)
        .has(this.strategy)
    ) {
      return null
    }

    const values = bots
      .get(this.exchange)
      .get(this.symbol)
      .get(this.strategy)

    const { exchange, strategy, symbol } = values
    const { fields } = this.props.appStore.strategyList.get(strategy)
    const props = { exchange, strategy, symbol, fields, values }

    return <StrategyConfig {...props} />
  }
}
