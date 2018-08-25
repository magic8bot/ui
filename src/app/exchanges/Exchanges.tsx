import React, { Component } from 'react'
import { reaction, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import Select from 'react-select'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import { AppStore } from '../app.store'
import { Flex, Card, Title, Subtext, TextWithIcon, Input, Warntext } from '../../ui'
import { Exchange } from './Exchange'

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

          <Flex className="input-group">
            <Select
              className="input react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
              options={options}
              value={this.selectedExchange}
              onChange={this.selectExchange}
            />

            <button className="input button" disabled={!this.selectedExchange} onClick={this.addExchange}>
              Add Exchange
            </button>
          </Flex>
        </Card>

        {this.renderWarning()}

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
      <div className="row row-no-padding row-wrap">
        {exchanges.map(({ name, description, fields, isNew, ...values }, idx) => (
          <div key={idx} className="column column-25">
            <Exchange name={name} description={description} fields={fields} isNew={isNew} values={values} />
          </div>
        ))}
      </div>
    )
  }

  private renderWarning() {
    const { appStore } = this.props
    if (!appStore.config || !appStore.config.exchanges.length || !appStore.exchanges) return null

    return (
      <Card>
        <Warntext>
          Warning: Modifying any setting for an exchange{' '}
          <i>
            <b>will stop</b>
          </i>{' '}
          all trade syncs, tickers, and strategies. It's up to you to manually restart them.
        </Warntext>
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
