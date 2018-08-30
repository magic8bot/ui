import './select.styl'

import React from 'react'
import ReactSelect from 'react-select'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
  value: Option
  onChange: (value: Option) => void
  isDisabled?: boolean
  className?: string
  placeholder?: string
}

export const Select = ({ options, value, onChange, isDisabled, className, placeholder = 'Select...' }: Props) => {
  const selectClassName = `react-select-container ${className}`
  const classNamePrefix = 'react-select'
  const isSearchable = false

  const props = { className: selectClassName, classNamePrefix, isSearchable, options, value, onChange, placeholder, isDisabled }

  return <ReactSelect {...props} />
}
