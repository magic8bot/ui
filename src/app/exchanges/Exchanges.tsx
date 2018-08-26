import React, { Component } from 'react'
import { reaction, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import { AppStore } from '../app.store'
import { Flex, Card, Title, Subtext, TextWithIcon, Warntext, Button, InputGroup, Select, Infotext } from '../../ui'
import { Exchange } from './Exchange'
import { Row, Column } from '../../ui/row'

interface Props {
  appStore?: AppStore
}

@inject('appStore')
@observer
export class Exchanges extends Component<Props> {
  private exchangeNames: string[] = []
  @observable
  private selectedExchange: {
    value: string
    label: string
  } = null

  constructor(props) {
    super(props)

    reaction(() => this.props.appStore.exchanges, (exchanges) => (this.exchangeNames = Object.keys(exchanges)))
  }

  public render() {
    const options = this.getOptions()

    return (
      <Flex direction="col">
        <Card>
          <Title isUnderlined>
            <TextWithIcon text="Exchanges" icon={faExchangeAlt} />
          </Title>
          <Subtext>Add and configure your exchanges.</Subtext>

          <InputGroup>
            <Select options={options} value={this.selectedExchange} onChange={this.selectExchange} />

            <Button isDisabled={!this.selectedExchange} onClick={this.addExchange}>
              Add Exchange
            </Button>
          </InputGroup>
        </Card>

        {this.renderInfo()}

        {this.renderExchanges()}
      </Flex>
    )
  }

  private getOptions() {
    if (!this.exchangeNames || !this.props.appStore.config) return []

    const configuredExchanges = this.props.appStore.config.exchanges.map(({ exchange }) => exchange)

    return this.exchangeNames.filter((exchange) => !configuredExchanges.find((e) => e === exchange)).map((name) => ({ value: name, label: name }))
  }

  private renderExchanges() {
    if (!this.props.appStore.config || !this.props.appStore.exchanges) return null

    const exchanges = this.props.appStore.config.exchanges.map(({ exchange: name, ...values }) => ({ name, ...this.props.appStore.exchanges[name], ...values }))

    return (
      <Row isWrap noPadding>
        {exchanges.map(({ name, description, fields, isNew, ...values }, idx) => (
          <Column key={idx} size={25}>
            <Exchange name={name} description={description} fields={fields} isNew={isNew} values={values} />
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
