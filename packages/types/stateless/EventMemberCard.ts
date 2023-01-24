import { WalletProfile } from '../profile'
import { LoadingData } from './common'

export interface EventMemberCardProps {
  address: string
  votingPowerPercent: LoadingData<number>
  profile: LoadingData<WalletProfile>
}
