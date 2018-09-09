import './toggle.styl'

import React from 'react'

interface Props {
  value: boolean
  onChange: () => void
  label?: string
}

export const Toggle = ({ value, onChange, label }: Props) => {
  const className = `toggle ${value ? 'toggle-on' : 'toggle-off'}`
  return (
    <div className="toggle-wrapper">
      {label && <div className="toggle-label">{label}</div>}
      <div className={className} onClick={() => onChange()} />
    </div>
  )
}
