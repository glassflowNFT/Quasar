export enum ProcessedTQType {
    Majority,
    Absolute,
    Percent,
  }


export interface CodeIdConfig {
    Cw20Base: number
    Cw20Stake: number
    Cw4Group: number
    Cw721Base: number
    CwTokenSwap: number
//  DaoCore: number
//  DaoPreProposeMultiple: number
//  DaoPreProposeSingle: number
//  DaoProposalMultiple: number
//  DaoProposalSingle: number
//  DaoVotingCw20Staked: number
//  DaoVotingCw4: number
//  DaoVotingCw721Staked: number
//  DaoVotingNativeStaked: number
}

export interface ChainPrefixIdMap {
    terp: string
  }