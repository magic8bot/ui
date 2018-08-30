import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { AppStore } from '../../app.store'
import { RouterStore } from 'mobx-react-router'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { StrategyConfig } from './StrategyConfig'
import { match } from 'react-router'
import { Page } from '../../../ui'

interface Params {
  exchange: string
  strategy: string
  symbol: string
}

interface Props {
  appStore?: AppStore
  routing?: RouterStore
  match?: match<Params>
}

@inject('appStore', 'routing')
@observer
export class StrategyConfigContainer extends Component<Props> {
  private exchange: string = null
  private strategy: string = null
  private symbol: string = null

  public render() {
    if (!this.props.appStore.strategies) return null

    const { exchange, strategy, symbol } = this.props.match.params

    this.exchange = exchange
    this.strategy = strategy
    this.symbol = symbol.replace('-', '/')

    const title = `${exchange[0].toUpperCase()}${exchange.slice(1)} - ${strategy} - ${this.symbol}`
    const subtitle = this.props.appStore.strategies[this.strategy].description
    const icon = faChevronLeft
    const link = `/bots/${exchange}`

    const props = { title, subtitle, icon, link }

    return <Page {...props}>{this.renderStrategy()}</Page>
  }

  private renderStrategy() {
    if (!this.props.appStore.config) return null

    const values = this.props.appStore.config.exchanges.find(({ exchange: name }) => name === this.exchange).strategies.find(({ strategy: name }) => name === this.strategy)

    const { exchange, strategy, symbol } = values
    const { fields } = this.props.appStore.strategies[strategy]
    const props = { exchange, strategy, symbol, fields, values }

    return <StrategyConfig {...props} />
  }
}
