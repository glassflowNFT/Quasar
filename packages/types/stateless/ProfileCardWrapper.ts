import { ReactNode } from 'react'

import { WalletProfile } from '../profile'
import { LoadingData } from './common'

export type ProfileCardWrapperProps = {
  children: ReactNode | ReactNode[]
  walletProfile: LoadingData<WalletProfile>
  showUpdateProfileNft: () => void
  updateProfileName: (name: string | null) => Promise<void>
  underHeaderComponent: ReactNode
  childContainerClassName?: string
  compact?: boolean
}
