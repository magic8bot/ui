import './content.styl'

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import { Route, Switch, Redirect } from 'react-router'

import { Home } from '../home'
import { Footer } from '../footer'
import { Exchanges } from '../exchanges'

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
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/exchanges" render={() => <Exchanges />} />
          </Switch>
        </div>
        <Footer />
      </section>
    )
  }
}
