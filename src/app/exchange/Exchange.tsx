import React, { Component } from 'react'
import { Input, Card } from '../../ui'
import { ExchangeConfig, StrategyConfig } from '../app.store'
import { Strategy } from '../strategy'

interface Props {
  exchange: ExchangeConfig
}

export class Exchange extends Component<Props> {
  public render() {
    const { exchange, strategies } = this.props.exchange

    const symbols = this.getSymbols(strategies)

    return (
      <Card>
        <h3>{exchange}</h3>

        {symbols.map((symbol) => (
          <div key={symbol}>
            <h5>{symbol}</h5>
            {strategies.filter(({ symbol: s }) => s === symbol).map((strategy) => (
              <Strategy key={strategy.strategy} strategy={strategy} />
            ))}
          </div>
        ))}
      </Card>
    )
  }

  private getSymbols(strategies: StrategyConfig[]) {
    return Array.from(
      strategies.reduce((acc, { symbol }) => {
        acc.add(symbol)
        return acc
      }, new Set<string>())
    )
  }
}
