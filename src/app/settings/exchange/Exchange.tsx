import React, { Component } from 'react'
import { Input, Card } from '../../../ui'
import { inject, observer } from 'mobx-react'
import { ExchangeStore } from './exchange.store'

interface Props {
  exchangeStore?: ExchangeStore
}

@inject('exchangeStore')
@observer
export class Exchange extends Component<Props> {
  constructor(props) {
    super(props)

    this.props.exchangeStore.loadAll()
  }

  public render() {
    return (
      <Card>
        <form>
          <fieldset>
            <h3>Exchange Actions</h3>
            <div>
              <Input
                initValue=""
                label="Test"
                onChange={(value) => {
                  console.log(value)
                }}
              />
            </div>
          </fieldset>
        </form>
      </Card>
    )
  }
}
