import './balance.styl'

import React from 'react'
import * as Coins from 'react-cryptocoins'

import { ucFirst } from '../../util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faEuroSign, faPoundSign, faQuestion } from '@fortawesome/free-solid-svg-icons'

interface Props {
  coin: string
  balance: number
}

export const Balance = ({ coin, balance }: Props) => {
  const getIcon = () => {
    if (coin === 'USD' || coin === 'EUR' || coin === 'GBP') {
      const icon = coin === 'USD' ? faDollarSign : coin === 'EUR' ? faEuroSign : faPoundSign
      return <FontAwesomeIcon className="balance-icon" icon={icon} />
    } else {
      const key = ucFirst(coin)
      if (!Coins[key]) return <FontAwesomeIcon className="balance-icon" icon={faQuestion} />
      const altKey = `${key}Alt`
      const Coin = Coins[altKey] ? Coins[altKey] : Coins[key]
      return <Coin className="balance-icon balance-crypto" size={16} />
    }
  }

  return (
    <div className="balance">
      {getIcon()}
      <div className="balance-coin">{coin}:</div>
      <div className="balance-value">{balance}</div>
    </div>
  )
}
