import React from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import { Flex } from '../flex'
import { TitleCard } from '../title-card'

interface Props extends React.PropsWithChildren<any> {
  title: string
  subtitle: string
  icon?: IconDefinition
  link?: string
  titleChildren?: React.ReactNode
}

export const Page = ({ children, titleChildren, ...props }: Props) => {
  return (
    <Flex direction="col">
      <TitleCard {...props}>{titleChildren && titleChildren}</TitleCard>

      {children}
    </Flex>
  )
}
