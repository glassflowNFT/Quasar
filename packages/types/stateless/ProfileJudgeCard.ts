import { ReactNode } from 'react'

import { ProfileCardWrapperProps } from './ProfileCardWrapper'

export interface ProfileJudgeCardProps
  extends Omit<
    ProfileCardWrapperProps,
    | 'children'
    | 'underHeaderComponent'
    | 'childContainerClassName'
    | 'established'
    | 'compact'
  > {
  currentVoteDisplay: ReactNode
  votingPower: number
  daoName: string
}
