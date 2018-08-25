import './text-with-icon.styl'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  text: string
  icon: IconDefinition
}

export const TextWithIcon = ({ text, icon }: Props) => {
  return (
    <div className="text-with-icon">
      <div className="text-with-icon__icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="text-with-icon__label">{text}</div>
    </div>
  )
}
