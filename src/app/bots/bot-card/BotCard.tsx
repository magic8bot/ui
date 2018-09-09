import React from 'react'
import { AppStore } from '../../app.store'
import { TitleCard, Flex, Link, Button } from '../../../ui'
import { inject, observer } from 'mobx-react'
import { ExchangeStore } from '../../exchanges'

interface Props {
  exchange: string
  description: string
  exchangeStore?: ExchangeStore
}

export const BotCard = inject('exchangeStore')(
  observer(({ exchange, exchangeStore, description }: Props) => {
    const exchangeConfig = exchangeStore.exchanges.get(exchange)
    const subtitle = description
    const isEnabled = exchangeConfig && !exchangeConfig.isNew
    const className = isEnabled ? '' : 'faded'

    return (
      <TitleCard key={exchange} titleSize={2} title={exchange} subtitle={subtitle} className={className}>
        {isEnabled && (
          <Flex>
            <Link to={`/bots/${exchange}`}>
              <Button isOutline>Edit Bot</Button>
            </Link>
          </Flex>
        )}
      </TitleCard>
    )
  })
)
