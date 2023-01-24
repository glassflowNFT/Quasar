import { EntryCardProps } from './stateless/EntryCard'

export type EntryCreatedCardProps = Omit<
  EntryCardProps,
  'className' | 'onMouseOver' | 'onMouseLeave' | 'LinkWrapper'
>