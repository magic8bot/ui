import React, { Component } from 'react'
import { Input, Card } from '../../../ui'

export class Wallet extends Component {
  public render() {
    return (
      <Card>
        <form>
          <fieldset>
            <h3>Wallet Actions</h3>
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
