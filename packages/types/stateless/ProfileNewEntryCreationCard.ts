import { ProfileNewEntryCreationCardInfoLine } from '../entry-creation-module-adapter'
import { LoadingData } from './common'
import { ProfileCardWrapperProps } from './ProfileCardWrapper'

export interface ProfileNewEntryCreationCardAddress {
  label: string
  address: string
}

export interface ProfileNewEntryCreationCardProps
  extends Omit<
    ProfileCardWrapperProps,
    | 'children'
    | 'underHeaderComponent'
    | 'childContainerClassName'
    | 'established'
    | 'compact'
  > {
  daoName: string
  info: LoadingData<{
    lines: ProfileNewEntryCreationCardInfoLine[]
    addresses: ProfileNewEntryCreationCardAddress[]
  }>
}
