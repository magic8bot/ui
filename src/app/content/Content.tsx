import './content.styl'

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import { Route, Switch, Redirect } from 'react-router'

import { Home } from '../home'
import { Card, Breadcrumbs } from '../../ui'
import { Footer } from '../footer'

@inject('routing')
@observer
export class Content extends Component {
  public render() {
    return (
      <section className="content">
        <div className="main-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" render={() => <Home />} />
            {/* <Route exact path="/settings/exchanges" render={() => <Exchange />} />
            <Route exact path="/settings/strategies" render={() => <Strategy />} />
            <Route exact path="/settings/wallets" render={() => <Wallet />} /> */}
          </Switch>
        </div>
        <Footer />
      </section>
    )
  }
}
