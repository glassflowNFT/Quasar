import { ComponentType, ReactNode } from 'react'

export interface EventInfoBarItem {
  Icon: ComponentType<{ className: string }>
  label: string
  tooltip?: string
  value: ReactNode
}

export interface EventInfoBarProps {
  items: EventInfoBarItem[]
  className?: string
}
