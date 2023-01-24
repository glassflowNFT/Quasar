import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
    EventResponse,
    GroupContractResponse,
    InfoResponse,
    MemberDiff,
    TotalPowerAtHeightResponse,
    VotingPowerAtHeightResponse,
  } from '@quasar-vote/types/contracts/EventJudgingCw4'

  export interface EventJudgingCw4ReadOnlyInterface {
      contractAddress: string
  groupContract: () => Promise<GroupContractResponse>
  event: () => Promise<EventResponse>
  votingPowerAtHeight: ({
    address,
    height,
  }: {
    address: string
    height?: number
}) => Promise<VotingPowerAtHeightResponse>
totalPowerAtHeight: ({
    height,
  }: {
    height?: number
  }) => Promise<TotalPowerAtHeightResponse>
  info: () => Promise<InfoResponse>
}
export class EventJudgingCw4QueryClient implements EventJudgingCw4ReadOnlyInterface {
    client: CosmWasmClient
    contractAddress: string

    constructor(client: CosmWasmClient, contractAddress: string) {
            this.client = client
    this.contractAddress = contractAddress
    this.groupContract = this.groupContract.bind(this)
    this.event = this.event.bind(this)
    this.votingPowerAtHeight = this.votingPowerAtHeight.bind(this)
    this.totalPowerAtHeight = this.totalPowerAtHeight.bind(this)
    this.info = this.info.bind(this)
    }

    groupContract = async (): Promise<GroupContractResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            group_contract: {},
          })
        }
        event = async (): Promise<EventResponse> => {
            return this.client.queryContractSmart(this.contractAddress, {
                event: {},
              })
            }
              votingPowerAtHeight = async ({
    address,
    height,
  }: {
    address: string
    height?: number
  }): Promise<VotingPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_power_at_height: {
        address,
        height,
      },
    })
  }
  totalPowerAtHeight = async ({
    height,
  }: {
    height?: number
  }): Promise<TotalPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_power_at_height: {
        height,
      },
    })
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
}
export interface EventJudgingCw4Interface extends EventJudgingCw4ReadOnlyInterface {
    contractAddress: string
    sender: string
    memberChangedHook: (
      {
        diffs,
      }: {
        diffs: MemberDiff[]
      },
      fee?: number | StdFee | 'auto',
      memo?: string,
      funds?: Coin[]
    ) => Promise<ExecuteResult>
  }

export class EventJudgingCw4Client
  extends EventJudgingCw4QueryClient
  implements EventJudgingCw4Interface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.memberChangedHook = this.memberChangedHook.bind(this)
  }

  memberChangedHook = async (
    {
      diffs,
    }: {
      diffs: MemberDiff[]
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        member_changed_hook: {
          diffs,
        },
      },
      fee,
      memo,
      funds
    )
  }
}