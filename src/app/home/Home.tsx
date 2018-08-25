import './home.styl'

import React, { Component } from 'react'
import { AppStore } from '../app.store'
import { inject, observer } from 'mobx-react'
import { TextWithIcon } from '../../ui'
import { faChartLine, faHistory, faHandHoldingUsd, faRobot } from '@fortawesome/free-solid-svg-icons'

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
          <div className="home-item home-item-50">
            <TextWithIcon text="Performance" icon={faChartLine} />
          </div>
          <div className="home-item home-item-50">
            <TextWithIcon text="Profit History" icon={faHistory} />
          </div>
        </div>
        <div className="home-bottom">
          <div className="home-item home-item-50">
            <TextWithIcon text="Holdings" icon={faHandHoldingUsd} />
          </div>
          <div className="home-item home-item-50">
            <TextWithIcon text="Bots" icon={faRobot} />
          </div>
        </div>
      </div>
    )
  }
}
