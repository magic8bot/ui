import './input-group.styl'

import React from 'react'
import { Flex } from '../flex'

interface Props extends React.Props<any> {
  alignment?: 'start' | 'end'
}

export const InputGroup = ({ alignment = 'start', children }: Props) => {
  const kids = React.Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') return child

    const className = !child.props.className ? 'input-group-child' : `input-group-child ${child.props.className}`
    const props = { className }

    return React.cloneElement(child, props)
  })

  return (
    <Flex alignment={alignment} className="input-group">
      {kids}
    </Flex>
  )
}
