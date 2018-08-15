import './log-item.styl'

import React from 'react'
import { LogType } from './log.store'

interface Props {
  log: LogType
}

export const LogItem = ({ log: { msg, type, time } }: Props) => {
  return (
    <div className={`${type}-item`}>
      {time}: {msg}
    </div>
  )
}
