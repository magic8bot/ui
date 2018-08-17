import './home.styl'

import React, { Component } from 'react'
import { Exchange } from '../exchange'
import { AppStore } from '../app.store'
import { inject, observer } from 'mobx-react'

interface Props {
  appStore?: AppStore
}

@inject('appStore')
@observer
export class Home extends Component<Props> {
  public render() {
    return (
      <div className="home">
        <div className="home-top">
          <div className="home-split">
            <div className="home-item home-item-25">Portfolio Value:</div>
            <div className="home-item home-item-75">Change: 1D: 7D: 30D:</div>
          </div>
          <div className="home-split">
            <div className="home-item home-item-50">Active Bots:</div>
            <div className="home-item home-item-50">Profit (24h):</div>
          </div>
        </div>
        <div className="home-center">
          <div className="home-item home-item-50">Performance</div>
          <div className="home-item home-item-50">Profit History</div>
        </div>
        <div className="home-bottom">
          <div className="home-item home-item-50">Holdings</div>
          <div className="home-item home-item-50">Bots</div>
        </div>
      </div>
    )
  }
}
