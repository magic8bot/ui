import React, { Component } from 'react'
import { reaction } from 'mobx'
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
            <Select className="input react-select-container" classNamePrefix="react-select" isSearchable={false} options={options} />

            <div className="input button">Add Exchange</div>
          </Flex>
        </Card>

        <Card>
          <Warntext>
            Warning: Modifying any setting for an exchange <i><b>will stop</b></i> all trade syncs, tickers, and strategies. It's up to you to manually restart them.
          </Warntext>
        </Card>

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
        {exchanges.map(({ name, description, fields, ...values }, idx) => (
          <div key={idx} className="column column-25">
            <Exchange name={name} description={description} fields={fields} values={values} />
          </div>
        ))}
      </div>
    )
  }
}
