import React from 'react'
import { AppStore } from '../../app.store'
import { TitleCard, Flex, Link, Button } from '../../../ui'
import { inject, observer } from 'mobx-react'

interface Props {
  exchange: string
  appStore?: AppStore
}

export const BotCard = inject('appStore')(
  observer(({ exchange, appStore }: Props) => {
    const exchangeConfig = appStore.config.exchanges.find((ex) => ex.exchange === exchange)
    const subtitle = appStore.exchanges[exchange].description
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
