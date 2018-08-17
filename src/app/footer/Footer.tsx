import './footer.styl'

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { LogStore } from './log.store'
import { LogItem } from './LogItem'
import { Card } from '../../ui'
import { observable } from 'mobx'

interface Props {
  logStore?: LogStore
}

@inject('logStore')
@observer
export class Footer extends Component<Props> {
  @observable
  private isClosed = true

  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className={`footer ${this.isClosed ? 'closed' : ''}`}>
        <div className="toggler-wrapper">
          <div className="toggler" onClick={() => this.handleToggle()}>
            {this.isClosed ? 'Logs ▲' : 'Logs ▼'}
          </div>
        </div>
        <Card>
          <div className="inner-footer">{this.renderLogs()}</div>
        </Card>
      </div>
    )
  }

  private handleToggle = () => {
    console.log('CLICKed')
    this.isClosed = !this.isClosed
  }

  private renderLogs() {
    const { logs } = this.props.logStore

    return (
      <div className="footer-logs">
        {logs.map((log, idx) => (
          <LogItem key={idx} log={log} />
        ))}
      </div>
    )
  }
}
