import './flex.styl'

import React from 'react'

interface Props extends React.Props<any> {
  direction?: 'row' | 'col'
  alignment?: 'start' | 'end' | 'around' | 'between'
  isReverse?: boolean
  className?: string
}

export const Flex = ({ direction = 'row', isReverse = false, alignment = 'start', className = '', children }: Props) => {
  const flexReverse = isReverse ? 'flex-reverse' : ''
  const flexClass = `flex-box flex-${direction} flex-${alignment} ${flexReverse} ${className}`
  return <div className={flexClass}>{children}</div>
}
