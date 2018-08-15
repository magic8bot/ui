import React from 'react'

interface Props {
  path: string
}

const ucFirst = (str) => (!str ? '' : `${str[0].toUpperCase()}${str.slice(1)}`)

export const Breadcrumbs = ({ path }: Props) => {
  const parts = path.split('/').filter(Boolean)

  return <span>{parts.map(ucFirst).join(' - ')}</span>
}
