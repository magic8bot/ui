import './card.styl'

import React from 'react'

interface Props extends React.Props<any> {
  size?: 'small' | 'large'
}

export const Card = ({ size = 'large', children }: Props) => {
  return <div className={`card card-${size}`}>{children}</div>
}
