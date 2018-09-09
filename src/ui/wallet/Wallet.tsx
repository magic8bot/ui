import './wallet.styl'

import React from 'react'
import { Balance } from '../balance'

interface Props {
  asset: string
  currency: string
  assetBalance: number
  currencyBalance: number
}

export const Wallet = ({ asset, currency, assetBalance, currencyBalance }: Props) => {
  return (
    <div className="wallet">
      <Balance coin={asset} balance={assetBalance} />
      <Balance coin={currency} balance={currencyBalance} />
    </div>
  )
}
