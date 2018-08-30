import React from 'react'

import { Card, Title, Subtext, TextWithIcon } from '..'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Props extends React.Props<any> {
  title: string
  subtitle?: string
  className?: string
  titleSize?: 1 | 2 | 3 | 4 | 5 | 6
  icon?: IconDefinition
  link?: string
}

export const TitleCard = ({ title, subtitle = null, className = '', titleSize = 1, icon = null, link = null, children }: Props) => {
  const isUnderlined = titleSize === 1
  const isUppercase = !isUnderlined

  const renderTitle = () => {
    if (icon && link) return <TextWithIcon text={title} icon={icon} link={link} />
    return icon ? <TextWithIcon text={title} icon={icon} /> : <div>{title}</div>
  }

  return (
    <Card className={`flex-no-shrink ${className}`}>
      <Title size={titleSize} isUnderlined={isUnderlined} isUppercase={isUppercase}>
        {renderTitle()}
      </Title>

      {subtitle && <Subtext>{subtitle}</Subtext>}

      {children}
    </Card>
  )
}
