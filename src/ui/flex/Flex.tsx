import './flex.styl'

import React from 'react'

interface Props extends React.Props<any> {
  direction?: 'row' | 'col'
  isReverse?: boolean
  className?: string
}

export const Flex = ({ direction = 'row', isReverse = false, className = '', children }: Props) => {
  const flexReverse = isReverse ? 'flex-reverse' : ''
  const flexClass = `flex-box flex-${direction} ${flexReverse} ${className}`
  return <div className={flexClass}>{children}</div>
}
