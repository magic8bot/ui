import './title.styl'

import React from 'react'

interface Props extends React.PropsWithChildren<any> {
  size?: 1 | 2 | 3 | 4 | 5 | 6
  isUnderlined?: boolean
  isUppercase?: boolean
}

export const Title = ({ size, isUnderlined = false, isUppercase = false, children }: Props) => {
  const underlined = !isUnderlined ? '' : 'title-underlined'
  const uppercased = !isUppercase ? '' : 'title-uppercase'
  const className = `title ${underlined} ${uppercased}`

  switch (size) {
    case 6:
      return <h6 className={className}>{children}</h6>
    case 5:
      return <h5 className={className}>{children}</h5>
    case 4:
      return <h4 className={className}>{children}</h4>
    case 3:
      return <h3 className={className}>{children}</h3>
    case 2:
      return <h2 className={className}>{children}</h2>
    case 1:
    default:
      return <h1 className={className}>{children}</h1>
  }
}
