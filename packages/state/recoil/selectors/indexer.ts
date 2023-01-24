import { atom, selectorFamily } from 'recoil'

import { WithChainId } from '@quasar-vote/types'
import { DumpStateResponse } from '@quasar-vote/types/contracts/DaoCore.v2'

import {
    EventSearchResult,
    QueryIndexerOptions,
    queryIndexer,
    searchDaos,
  } from '../../indexer'

  import {
    refreshOpenEntriesAtom,
    refreshWalletEntryStatsAtom,
  } from '../atoms'

  export const queryContractIndexerSelector = selectorFamily<
  any,
  {
    contractAddress: string
    formulaName: string
    // Refresh by changing this value.
    id?: number
  } & QueryIndexerOptions
>({
     key: 'queryContractIndexer',
  get:
    ({ contractAddress, formulaName, ...options }) =>
    async () => {
      try {
        return await queryIndexer(
          'contract',
          contractAddress,
          formulaName,
          options
        )
      } catch (err) {
        // If the indexer fails, return null.
        console.error(err)
        return null
      }
    },
})

export const queryWalletIndexerSelector = selectorFamily<
  any,
  {
    walletAddress: string
    formulaName: string
    // Refresh by changing this value.
    id?: number
  } & QueryIndexerOptions
>({
  key: 'queryWalletIndexer',
  get:
    ({ walletAddress, formulaName, ...options }) =>
    async () => {
      try {
        return await queryIndexer('wallet', walletAddress, formulaName, options)
      } catch (err) {
        // If the indexer fails, return null.
        console.error(err)
        return null
      }
    },
})

export const queryGenericIndexerSelector = selectorFamily<
  any,
  {
    formulaName: string
    // Refresh by changing this value.
    id?: number
  } & QueryIndexerOptions
>({
  key: 'queryGenericIndexer',
  get:
    ({ formulaName, ...options }) =>
    async () => {
      try {
        return await queryIndexer('generic', '_', formulaName, options)
      } catch (err) {
        // If the indexer fails, return null.
        console.error(err)
        return null
      }
    },
})

export const searchEventsSelector = selectorFamily<
EventSearchResult[],
  {
    query: string
    limit?: number
    exclude?: string[]
  }
>({
  key: 'searchEvents',
  get:
    ({ query, limit, exclude }) =>
    async () =>
      await searchEvents(query, limit, exclude),
})

export const openEntriesSelector = selectorFamily<
 {
    proposalModuleAddress: string
    proposals: { id: number; voted?: boolean }[]
  }[],
  WithChainId<{ coreAddress: string; address?: string }>
  >({
  key: 'openEntries',
    get:
    ({ coreAddress, chainId, address }) =>
    ({ get }) => {
      const id = get(refreshOpenEntriesAtom)
      const openEntries = get(
        queryContractIndexerSelector({
          contractAddress: coreAddress,
          formulaName: 'eventCore/openEntries',
          chainId,
          id,
          args: { address },
        })
      )
      return openEntries ?? []
    },
})

export const walletEntryStatsSelector = selectorFamily<
| {
    created: number
    votesCast: number
  }
| undefined,
WithChainId<{ address: string }>
>({
key: 'walletEntryStats',
get:
  ({ address, chainId }) =>
  ({ get }) => {
    const id = get(refreshWalletEntryStatsAtom)
    const stats = get(
      queryWalletIndexerSelector({
        walletAddress: address,
        formulaName: 'entries/stats',
        chainId,
        id,
      })
    )
    return stats ?? undefined
  },
})

export const featuredEventDumpStatesAtom = atom<
  (DumpStateResponse & { coreAddress: string })[] | null
>({
  key: 'featuredEventDumpStates',
  default: null,
})