import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export interface EventDropdownInfo {
  coreAddress: string
  imageUrl: string
  name: string
  subevents?: EventDropdownInfo[]
  content?: ReactNode
}

export interface DaoDropdownProps {
  dao: EventDropdownInfo
  expandedLocalStorageKey?: string
  defaultExpanded?: boolean
  showSubEvents?: boolean
  indent?: number
  compact?: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
}
