import './content.styl'

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import { Route, Switch, Redirect } from 'react-router'

import { Home } from '../home'
import { Footer } from '../footer'
import { Exchanges } from '../exchanges'
import { Bots, ExchangeConfig, StrategyConfigContainer } from '../bots'

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
        <div className="main-content">
          <Switch location={location}>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/exchanges" component={Exchanges} />
            <Route exact path="/bots" component={Bots} />
            <Route exact path="/bots/:exchange" component={ExchangeConfig} />
            <Route exact path="/bots/:exchange/:symbol/:strategy" component={StrategyConfigContainer} />
          </Switch>
        </div>
        <Footer />
      </section>
    )
  }
}
