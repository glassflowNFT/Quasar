import { selectorFamily } from 'recoil'

import { WithChainId } from '@quasar-vote/types'
import { StatusResponse } from '@quasar-vote/types/contracts/CwTokenSwap'

import { CwTokenSwapQueryClient } from '../../../contracts/CwTokenSwap'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwTokenSwapQueryClient,
  QueryClientParams
>({
  key: 'cwTokenSwapQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwTokenSwapQueryClient(client, contractAddress)
    },
})
export const statusSelector = selectorFamily<
  StatusResponse,
  QueryClientParams & {
    params: Parameters<CwTokenSwapQueryClient['status']>
  }
>({
  key: 'cwTokenSwapStatus',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const status = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cwTokenSwap/status',
        })
      )
      if (status) {
        return status
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.status(...params)
    },
})
