import { ComponentType } from 'react'

import { EventParentInfo } from '../event'
import { LoadingData } from './common'
import { IconButtonLinkProps } from './IconButtonLink'
import { LinkWrapperProps } from './LinkWrapper'

// Loaded by card once displaying.
export interface EventCardInfoLazyData {
  isMember: boolean
  tokenBalance: number
  proposalCount: number
}

export interface EventCardInfo {
  // Use ChainInfoID from @xiti/cosmodal.
  chainId: string
  coreAddress: string
  name: string
  description: string
  imageUrl: string
  established?: Date
  className?: string
  showIsMember?: boolean
  parentEvent?: EventParentInfo
  tokenSymbol: string
  showingEstimatedUsdValue: boolean
  tokenDecimals: number

  lazyData: LoadingData<EventCardInfoLazyData>
}

export interface DaoCardProps extends EventCardInfo {
  pinned: boolean
  onPin: () => void
  hidePin?: boolean
  onMouseOver?: () => void
  onMouseLeave?: () => void
  LinkWrapper: ComponentType<LinkWrapperProps>
  IconButtonLink: ComponentType<IconButtonLinkProps>
}
