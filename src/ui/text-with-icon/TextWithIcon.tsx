import './text-with-icon.styl'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Link } from '../link'

interface Props {
  text: string
  icon: IconDefinition
  link?: string
}

export const TextWithIcon = ({ text, icon, link = null }: Props) => {
  const renderIcon = () => {
    return !link ? (
      <FontAwesomeIcon icon={icon} />
    ) : (
      <Link to={link}>
        <FontAwesomeIcon icon={icon} />
      </Link>
    )
  }

  return (
    <div className="text-with-icon">
      <div className="text-with-icon__icon">{renderIcon()}</div>
      <div className="text-with-icon__label">{text}</div>
    </div>
  )
}
