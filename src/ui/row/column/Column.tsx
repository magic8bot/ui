import './column.styl'

import React from 'react'

interface Props extends React.Props<any> {
  size: 10 | 20 | 25 | 50 | 75 | 80 | 90 | 100 | 33 | 34 | 66 | 67
  offset?: 10 | 20 | 25 | 50 | 75 | 80 | 90 | 33 | 34 | 66 | 67
}

export const Column = ({ size, offset, children }: Props) => {
  const className = `column column-${size}` + (!offset ? '' : ` column-offset-${offset}`)

  return <div className={className}>{children}</div>
}
