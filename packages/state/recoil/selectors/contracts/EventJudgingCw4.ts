import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
    EventResponse,
    GroupContractResponse,
    InfoResponse,
    TotalPowerAtHeightResponse,
    JudgingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/EventVotingCw4'

import {
    EventJudgingCw4Client,
    EventJudgingCw4QueryClient,
} from '../../../contracts/EventJudgingCw4'
import { signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
    contractAddress: string
}>

export const queryClient = selectorFamily<
    EventJudgingCw4QueryClient,
    QueryClientParams
>({
    key: 'eventJudgingCw4QueryClient',
    get:
        ({ contractAddress, chainId }) =>
            ({ get }) => {
                const client = get(cosmWasmClientForChainSelector(chainId))
                return new EventJudgingCw4QueryClient(client, contractAddress)
            },
})

export type ExecuteClientParams = {
    contractAddress: string
    sender: string
}

export const executeClient = selectorFamily<
EventJudgingCw4Client | undefined,
    ExecuteClientParams
>({
    key: 'eventJudgingCw4ExecuteClient',
    get:
        ({ contractAddress, sender }) =>
            ({ get }) => {
                const client = get(signingCosmWasmClientAtom)
                if (!client) return
                return new EventJudgingCw4Client(client, sender, contractAddress)
            },
    dangerouslyAllowMutability: true,
})

export const groupContractSelector = selectorFamily<
  GroupContractResponse,
  QueryClientParams & {
    params: Parameters<EventJudgingCw4QueryClient['groupContract']>
  }
>({
  key: 'eventJudgingCw4GroupContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const groupContract = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventJudgingCw4/groupContract',
        })
      )
      if (groupContract) {
        return groupContract
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.groupContract(...params)
    },
})
export const eventSelector = selectorFamily<
EventResponse,
  QueryClientParams & {
    params: Parameters<EventJudgingCw4QueryClient['event']>
  }
>({
  key: 'eventJudgingCw4Event',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const event = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventJudgingCw4/event',
        })
      )
      if (event) {
        return event
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.event(...params)
    },
})
export const judgingPowerAtHeightSelector = selectorFamily<
JudgingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<EventJudgingCw4QueryClient['judgingPowerAtHeight']>
  }
>({
  key: 'eventJudgingCw4JudgingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const judgingPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventJudgingCw4/judgingPower',
          args: {
            address: params[0].address,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
        })
      )
      if (judgingPower && !isNaN(judgingPower)) {
        return {
          power: judgingPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.judgingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<EventJudgingCw4QueryClient['totalPowerAtHeight']>
  }
>({
  key: 'eventJudgingCw4TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const totalPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventJudgingCw4/totalPower',
          block: params[0].height ? { height: params[0].height } : undefined,
        })
      )
      if (totalPower && !isNaN(totalPower)) {
        return {
          power: totalPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<EventJudgingCw4QueryClient['info']>
  }
>({
  key: 'eventJudgingCw4Info',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'info',
        })
      )
      if (info) {
        return { info }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})