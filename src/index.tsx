import './index.styl'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import { App } from './app'
import { logStore } from './app/footer'
import { wsClient } from './lib'
import { exchangeStore } from './app/settings/exchange/exchange.store'

const loadApp = async () => {
  await wsClient.connect()

  const root = document.getElementById('app-root')
  render(
    <Provider logStore={logStore} exchangeStore={exchangeStore}>
      <App />
    </Provider>,
    root
  )
}

loadApp()
