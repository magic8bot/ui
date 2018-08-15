import './sidebar-item.styl'

import React from 'react'

interface Props {
  label: string
  onClick?: () => void
}

export const SidebarItem = ({ label, onClick }: Props) => {
  return (
    <div className="sidebar-item" onClick={onClick}>
      {label}
    </div>
  )
}
