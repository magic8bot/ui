import './row.styl'

import React from 'react'

interface Props extends React.Props<any> {
  isWrap?: boolean
  noPadding?: boolean
  alignment?: 'top' | 'bottom' | 'center' | 'stretch' | 'baseline'
  className?: string
}

export const Row = ({ isWrap, noPadding, alignment = 'top', className = '', children }: Props) => {
  const rowClassName = `${className} row row-${alignment}` + (!isWrap ? '' : ' row-wrap') + (!noPadding ? '' : ' row-no-padding')

  return <div className={rowClassName}>{children}</div>
}
