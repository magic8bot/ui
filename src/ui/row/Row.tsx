import './row.styl'

import React from 'react'

interface Props extends React.Props<any> {
  isWrap?: boolean
  noPadding?: boolean
  alignment?: 'top' | 'bottom' | 'center' | 'stretch' | 'baseline'
}

export const Row = ({ isWrap, noPadding, alignment = 'top', children }: Props) => {
  const className = `row row-${alignment}` + (!isWrap ? '' : ' row-wrap') + (!noPadding ? '' : ' row-no-padding')

  return <div className={className}>{children}</div>
}
