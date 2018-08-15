import './footer.styl'

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { LogStore } from './log.store'
import { LogItem } from './LogItem'
import { Card } from '../../ui'

interface Props {
  logStore?: LogStore
}

@inject('logStore')
@observer
export class Footer extends Component<Props> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className="footer">
        <Card>
          <div className="inner-footer">{this.renderLogs()}</div>
        </Card>
      </div>
    )
  }

  private renderLogs() {
    const { logs } = this.props.logStore

    return logs.map((log, idx) => <LogItem key={idx} log={log} />)
  }
}
