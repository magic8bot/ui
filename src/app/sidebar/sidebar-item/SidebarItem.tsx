import './sidebar-item.styl'

import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { TextWithIcon } from '../../../ui'

interface Props {
  text: string
  icon: IconDefinition
  onClick?: () => void
}

export const SidebarItem = ({ text, icon, onClick }: Props) => {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <TextWithIcon text={text} icon={icon} />
    </div>
  )
}
