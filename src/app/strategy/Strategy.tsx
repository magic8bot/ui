import React, { Component } from 'react'
import { StrategyConfig } from '../app.store'

interface Props {
  strategy: StrategyConfig
}

export class Strategy extends Component<Props> {
  public render() {
    const {
      strategy,
      symbol,
      wallet: { asset, currency },
    } = this.props.strategy

    const [a, c] = symbol.split('/')
    return (
      <div>
        <h6>
          {strategy} - {a}: {asset} / {c}: {currency}
        </h6>
      </div>
    )
  }
}
