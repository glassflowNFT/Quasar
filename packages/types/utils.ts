export enum ProcessedTQType {
    Majority,
    Absolute,
    Percent,
  }

  export type ProcessedTQ = { display: string } & (
    | { type: ProcessedTQType.Majority }
    | { type: ProcessedTQType.Absolute | ProcessedTQType.Percent; value: number }


export interface CodeIdConfig {
    Cw20Base: number
    Cw20Stake: number
    Cw4Group: number
    Cw721Base: number
    CwTokenSwap: number
    EventCore: number
//  DaoPreProposeMultiple: number
//  DaoPreProposeSingle: number
//  DaoProposalMultiple: number
//  DaoProposalSingle: number
//  DaoVotingCw20Staked: number
    EventVotingCw4: number
//  DaoVotingCw721Staked: number
//  DaoVotingNativeStaked: number
}

export interface ChainPrefixIdMap {
    terp: string
  }