import './range.styl'

import React from 'react'
import Slider from 'react-rangeslider'

interface Props {
  min?: number
  max?: number
  step?: number
  value: number
  onChange: (value: number) => void
}

export const Range = ({ min = 0, max = 100, step = 1, value, onChange }: Props) => {
  const props = { min, max, step, value, onChange, tooltip: false }
  return <Slider {...props} />
}
