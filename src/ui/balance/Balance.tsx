import './balance.styl'

import React from 'react'
import * as Coins from '../coin-icon'

import { ucFirst } from '../../util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faEuroSign, faPoundSign, faQuestion } from '@fortawesome/free-solid-svg-icons'

interface Props {
  coin: string
  balance: number
}

const getFiatIcon = (coin: string) => (coin.includes('USD') ? faDollarSign : coin === 'EUR' ? faEuroSign : faPoundSign)

const CoinIcon = React.memo(({ coin }: { coin: string }) => {
  if (coin.includes('USD') || coin === 'EUR' || coin === 'GBP')
    return <FontAwesomeIcon className="balance-icon" icon={getFiatIcon(coin)} />

  const key = ucFirst(coin)
  if (!Coins[key]) return <FontAwesomeIcon className="balance-icon" icon={faQuestion} />

  const altKey = `${key}Alt`
  const Coin = Coins[altKey] ? Coins[altKey] : Coins[key]

  return <Coin className="balance-icon balance-crypto" size={16} />
})

export const Balance = ({ coin, balance }: Props) => {
  return (
    <div className="balance">
      <CoinIcon coin={coin} />
      <div className="balance-coin">{coin}:</div>
      <div className="balance-value">{balance.toLocaleString('fullwide')}</div>
    </div>
  )
}
