import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import { AppStore } from '../app.store'
import { ExchangeStore } from './exchange.store'

import { Card, Button, InputGroup, Select, Infotext, Page } from '../../ui'
import { ExchangeCard } from './exchange-card'
import { Row, Column } from '../../ui/row'

interface Props {
  appStore?: AppStore
  exchangeStore?: ExchangeStore
}

@inject('appStore', 'exchangeStore')
@observer
export class Exchanges extends Component<Props> {
  private title = 'Exchanges'
  private subtitle = 'Add and configure your exchanges.'
  private icon = faExchangeAlt

  @observable
  private selectedExchange: {
    value: string
    label: string
  } = null

  public render() {
    const titleChildren = this.renderTitleChildren()
    const { title, subtitle, icon } = this
    const props = { title, subtitle, icon, titleChildren }

    return (
      <Page {...props}>
        {this.renderInfo()}

        {this.renderExchanges()}
      </Page>
    )
  }

  private renderTitleChildren() {
    const options = this.getOptions()

    return (
      <InputGroup>
        <Select options={options} value={this.selectedExchange} onChange={this.selectExchange} />

        <Button isOutline isDisabled={!this.selectedExchange} onClick={this.addExchange}>
          Add Exchange
        </Button>
      </InputGroup>
    )
  }

  private getOptions() {
    if (!this.props.appStore.exchangeList.size || !this.props.exchangeStore.exchanges) return []
    const exchangeNames = Array.from(this.props.appStore.exchangeList.keys())

    const configuredExchanges = Array.from(this.props.exchangeStore.exchanges.keys())

    return exchangeNames.filter((exchange) => !configuredExchanges.find((e) => e === exchange)).map((name) => ({ value: name, label: name }))
  }

  private renderExchanges() {
    if (!this.props.appStore.exchangeList.size || !this.props.exchangeStore.exchanges.size) return null

    const configuredExchanges = Array.from(this.props.exchangeStore.exchanges.keys())

    return (
      <Row isWrap noPadding>
        {configuredExchanges.map((exchange, idx) => (
          <Column key={idx} size={25}>
            <ExchangeCard exchange={exchange} />
          </Column>
        ))}
      </Row>
    )
  }

  private renderInfo() {
    const { appStore, exchangeStore } = this.props
    if (!exchangeStore.exchanges.size || !appStore.exchangeList.size) return null

    return (
      <Card>
        <Infotext>
          <b>Info:</b> Modifying any setting for an exchange <i>will stop</i> all trade syncs, tickers, and strategies. It's up to you to manually restart them.
        </Infotext>
      </Card>
    )
  }

  private selectExchange = (value) => {
    this.selectedExchange = value
  }

  private addExchange = () => {
    if (!this.selectedExchange) return
    this.props.exchangeStore.addExchange(this.selectedExchange.value)
    this.selectedExchange = null
  }
}
