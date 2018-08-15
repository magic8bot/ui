import './content.styl'

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import { Route, Switch, Redirect } from 'react-router'

import { Exchange, Strategy, Wallet } from '../settings'
import { Dashboard } from '../dashboard'
import { Card } from '../../ui'

interface Props {
  routing?: RouterStore
}

@inject('routing')
@observer
export class Content extends Component<Props> {
  public render() {
    const { location } = this.props.routing

    return (
      <section className="content">
        <Card size="small">
          Current pathname: {location.pathname} {location.key}
        </Card>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
          <Route exact path="/settings/exchanges" render={() => <Exchange />} />
          <Route exact path="/settings/strategies" render={() => <Strategy />} />
          <Route exact path="/settings/wallets" render={() => <Wallet />} />
        </Switch>
      </section>
    )
  }
}
