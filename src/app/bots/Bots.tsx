import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { faRobot } from '@fortawesome/free-solid-svg-icons'

import { AppStore } from '../app.store'
import { Page } from '../../ui'
import { BotCard } from './bot-card'
import { ExchangeStore } from '../exchanges'

interface Props {
  appStore?: AppStore
  exchangeStore?: ExchangeStore
}

@inject('appStore', 'exchangeStore')
@observer
export class Bots extends Component<Props> {
  private title = 'Bots'
  private subtitle = 'Add and configure your bots/strategies.'
  private icon = faRobot

  public render() {
    const { title, icon, subtitle } = this
    const props = { title, icon, subtitle }

    return <Page {...props}>{this.renderExchanges()}</Page>
  }

  private renderExchanges() {
    if (!this.props.exchangeStore.exchanges.size || !this.props.appStore.exchangeList.size) return null

    return Array.from(this.props.appStore.exchangeList.values())
      .sort(({ name: a }, { name: b }) => (a > b ? 1 : -1))
      .map(({ name, description }) => <BotCard key={name} exchange={name} description={description} />)
  }
}
