import './index.styl'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import { App } from './app'
import { logStore } from './app/footer'
import { appStore } from './app/app.store'
import { exchangeStore } from './app/exchanges'
import { botStore } from './app/bots'

const stores = { logStore, appStore, exchangeStore, botStore }

const root = document.getElementById('app-root')
render(
  <Provider {...stores}>
    <App />
  </Provider>,
  root
)
