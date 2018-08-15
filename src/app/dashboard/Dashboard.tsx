import React, { Component } from 'react'
import { Input, Card } from '../../ui'

export class Dashboard extends Component {
  public render() {
    return (
      <Card>
        <form>
          <fieldset>
            <h3>Dashboard Actions</h3>
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
