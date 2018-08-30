import React from 'react'
import { ucFirst } from '../../util'

interface Props {
  path: string
}

export const Breadcrumbs = ({ path }: Props) => {
  const parts = path.split('/').filter(Boolean)

  return <span>{parts.map(ucFirst).join(' - ')}</span>
}
