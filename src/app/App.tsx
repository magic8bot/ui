import './app.styl'

import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { Provider, inject, observer } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router'

import { Header } from './header'
import { Sidebar } from './sidebar'
import { Content } from './content'
import { AppStore } from './app.store'
import { ExchangeStore } from './exchanges'

const browserHistory = createBrowserHistory()
const routing = new RouterStore()

const history = syncHistoryWithStore(browserHistory, routing)

interface Props {
  appStore?: AppStore
  exchangeStore?: ExchangeStore
}

@inject('appStore', 'exchangeStore')
@observer
export class App extends Component<Props> {
  public async componentDidMount() {
    await this.props.appStore.loadLists()
    await this.props.exchangeStore.getExchanges()
  }

  public render() {
    return (
      <Provider routing={routing}>
        <Router history={history}>
          <div>
            <Header />
            <main className="main">
              <Sidebar />
              <Content />
            </main>
          </div>
        </Router>
      </Provider>
    )
  }
}
