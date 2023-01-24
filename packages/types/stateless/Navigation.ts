import { ComponentType } from 'react'

import { LoadingData } from './common'
import { EventDropdownInfo } from './EventDropdown'
import { LinkWrapperProps } from './LinkWrapper'

export interface NavigationTokenPrice {
  label: string
  price: number
  priceDenom: string
  change?: number
}

export interface NavigationProps {
  setCommandModalVisible: () => void
  inboxCount: LoadingData<number>
  version: string
  tokenPrices?: LoadingData<NavigationTokenPrice[]>
  pinnedEvents: LoadingData<EventDropdownInfo[]>
  hideInbox?: boolean
  compact: boolean
  setCompact: (compact: boolean) => void
  mountedInBrowser: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
}
