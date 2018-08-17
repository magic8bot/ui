import './index.styl'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import { App } from './app'
import { logStore } from './app/footer'
import { appStore } from './app/app.store'

const root = document.getElementById('app-root')
render(
  <Provider logStore={logStore} appStore={appStore}>
    <App />
  </Provider>,
  root
)
