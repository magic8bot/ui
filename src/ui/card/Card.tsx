import './card.styl'

import React from 'react'

interface Props extends React.PropsWithChildren<any> {
  size?: 'small' | 'large'
  className?: string
}

export const Card = ({ size = 'large', children, className = '' }: Props) => {
  return <div className={`card card-${size} ${className}`}>{children}</div>
}
