import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import { faRobot } from '@fortawesome/free-solid-svg-icons'

import { AppStore, ExchangeConfig, StrategyConfig } from '../app.store'
import { Flex, Card, Title, Subtext, InputGroup, Button, Select, Balance, Page, TitleCard, Link } from '../../ui'
import { Row, Column } from '../../ui/row'
import { Strategy } from './Strategy'

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
      .map((exchange) => this.renderExchange(exchange))
  }

  private renderExchange(exchange: string) {
    const exchangeConfig = this.props.appStore.config.exchanges.find((ex) => ex.exchange === exchange)
    const subtitle = this.props.appStore.exchanges[exchange].description
    const isEnabled = exchangeConfig && !exchangeConfig.isNew
    const className = isEnabled ? '' : 'faded'

    return (
      <TitleCard key={exchange} titleSize={2} title={exchange} subtitle={subtitle} className={className}>
        {isEnabled && (
          <Flex>
            <Link to={`/bots/${exchange}`}>
              <Button isOutline>Edit Bot</Button>
            </Link>
          </Flex>
        )}
      </TitleCard>
    )
  }
}
