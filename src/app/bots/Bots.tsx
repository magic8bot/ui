import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { faRobot } from '@fortawesome/free-solid-svg-icons'

import { AppStore } from '../app.store'
import { Page } from '../../ui'
import { BotCard } from './bot-card'

interface Props {
  appStore?: AppStore
}

@inject('appStore')
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
    if (!this.props.appStore.config || !this.props.appStore.exchanges) return null

    return Object.keys(this.props.appStore.exchanges)
      .sort((a, b) => (a > b ? 1 : -1))
      .map((exchange) => <BotCard key={exchange} exchange={exchange} />)
  }
}
