import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import { AppStore } from '../app.store'
import { Card, Button, InputGroup, Select, Infotext, Page } from '../../ui'
import { ExchangeCard } from './exchange-card'
import { Row, Column } from '../../ui/row'

interface Props {
  appStore?: AppStore
}

@inject('appStore')
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

        <Button isDisabled={!this.selectedExchange} onClick={this.addExchange}>
          Add Exchange
        </Button>
      </InputGroup>
    )
  }

  private getOptions() {
    if (!this.props.appStore.exchanges || !this.props.appStore.config) return []
    const exchangeNames = Object.keys(this.props.appStore.exchanges)

    const configuredExchanges = this.props.appStore.config.exchanges.map(({ exchange }) => exchange)

    return exchangeNames.filter((exchange) => !configuredExchanges.find((e) => e === exchange)).map((name) => ({ value: name, label: name }))
  }

  private renderExchanges() {
    if (!this.props.appStore.config || !this.props.appStore.exchanges) return null

    const exchanges = this.props.appStore.config.exchanges.map(({ exchange: name, ...values }) => ({ name, ...this.props.appStore.exchanges[name], ...values }))

    return (
      <Row isWrap noPadding>
        {exchanges.map(({ name, description, fields, isNew, ...values }, idx) => (
          <Column key={idx} size={25}>
            <ExchangeCard name={name} description={description} fields={fields} isNew={isNew} values={values} />
          </Column>
        ))}
      </Row>
    )
  }

  private renderInfo() {
    const { appStore } = this.props
    if (!appStore.config || !appStore.config.exchanges.length || !appStore.exchanges) return null

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
    this.props.appStore.addExchange(this.selectedExchange.value)
    this.selectedExchange = null
  }
}
