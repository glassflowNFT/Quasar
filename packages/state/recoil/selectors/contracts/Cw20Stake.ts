import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ClaimsResponse,
  GetConfigResponse,
  GetHooksResponse,
  ListStakersResponse,
  StakedBalanceAtHeightResponse,
  StakedValueResponse,
  TotalStakedAtHeightResponse,
  TotalValueResponse,
} from '@dao-dao/types/contracts/Cw20Stake'

import {
  Cw20StakeClient,
  Cw20StakeQueryClient,
} from '../../../contracts/Cw20Stake'
import {
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<Cw20StakeQueryClient, QueryClientParams>({
  key: 'cw20StakeQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw20StakeQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  Cw20StakeClient | undefined,
  ExecuteClientParams
>({
  key: 'cw20StakeExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new Cw20StakeClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const stakedBalanceAtHeightSelector = selectorFamily<
  StakedBalanceAtHeightResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['stakedBalanceAtHeight']>
  }
>({
  key: 'cw20StakeStakedBalanceAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const balance = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/stakedBalance',
          args: {
            address: params[0].address,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (balance && !isNaN(balance)) {
        return {
          balance,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.stakedBalanceAtHeight(...params)
    },
})
export const totalStakedAtHeightSelector = selectorFamily<
  TotalStakedAtHeightResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['totalStakedAtHeight']>
  }
>({
  key: 'cw20StakeTotalStakedAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      const total = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/totalStaked',
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (total && !isNaN(total)) {
        return {
          total,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalStakedAtHeight(...params)
    },
})
export const stakedValueSelector = selectorFamily<
  StakedValueResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['stakedValue']>
  }
>({
  key: 'cw20StakeStakedValue',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const value = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/stakedValue',
          args: params[0],
          id,
        })
      )
      if (value && !isNaN(value)) {
        return { value }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.stakedValue(...params)
    },
})
export const totalValueSelector = selectorFamily<
  TotalValueResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['totalValue']>
  }
>({
  key: 'cw20StakeTotalValue',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      const total = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/totalValue',
          id,
        })
      )
      if (total && !isNaN(total)) {
        return { total }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalValue(...params)
    },
})
export const getConfigSelector = selectorFamily<
  GetConfigResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['getConfig']>
  }
>({
  key: 'cw20StakeGetConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/config',
        })
      )
      if (config) {
        return config
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.getConfig(...params)
    },
})
export const claimsSelector = selectorFamily<
  ClaimsResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['claims']>
  }
>({
  key: 'cw20StakeClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshClaimsIdAtom(params[0].address))

      const claims = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/claims',
          args: params[0],
          id,
        })
      )
      if (claims) {
        return { claims }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const getHooksSelector = selectorFamily<
  GetHooksResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['getHooks']>
  }
>({
  key: 'cw20StakeGetHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getHooks(...params)
    },
})
export const listStakersSelector = selectorFamily<
  ListStakersResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['listStakers']>
  }
>({
  key: 'cw20StakeListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/listStakers',
          args: params[0],
        })
      )
      if (list) {
        return { stakers: list }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.listStakers(...params)
    },
})

///! Custom selectors

export const topStakersSelector = selectorFamily<
  | {
      address: string
      balance: string
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'cw20StakeTopStakers',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw20Stake/topStakers',
          args: {
            limit,
          },
        })
      ) ?? undefined,
})
