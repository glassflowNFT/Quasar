import { ChainInfoID } from '@xiti/cosmodal'
import { selectorFamily, waitForAll } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import {
    ActiveEntryModulesResponse,
    AdminNominationResponse,
    AdminResponse,
    ConfigResponse,
    Cw20BalanceResponse,
    Cw20BalancesResponse,
    Cw20TokenListResponse,
    Cw721TokenListResponse,
    EventURIResponse,
    DumpStateResponse,
    GetItemResponse,
    InfoResponse,
    ListItemsResponse,
//  ListSubDaosResponse,
    PauseInfoResponse,
    EntryModulesResponse,
    TotalPowerAtHeightResponse,
    JudgingModuleResponse,
    JudgingPowerAtHeightResponse
} from '@dao-dao/types/contracts/EventCore'
import { CHAIN_ID } from '@dao-dao/utils'

// import { Cw721BaseSelectors, DaoVotingCw20StakedSelectors } from '.'
import {
    EventCoreClient,
    EventCoreQueryClient,
  } from '../../../contracts/EventCore'
import featuredEvents from '../../../featured_events.json'
import {
    refreshEventJudgingPowerAtom,
    refreshWalletBalancesIdAtom,
    signingCosmWasmClientAtom,
  } from '../../atoms'
  import { cosmWasmClientForChainSelector } from '../chain'
  import {
    featuredEventDumpStatesAtom,
    queryContractIndexerSelector,
  } from '../indexer'
  import * as Cw20BaseSelectors from './Cw20Base'

  type QueryClientParams = WithChainId<{
    contractAddress: string
  }>

  export const queryClient = selectorFamily<
  EventCoreQueryClient,
  QueryClientParams
>({
  key: 'eventCoreQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new EventCoreQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
    contractAddress: string
    sender: string
  }

  export const executeClient = selectorFamily<
  EventCoreClient | undefined,
  ExecuteClientParams
>({
  key: 'eventCoreExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new EventCoreClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<
  AdminResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['admin']>
  }
>({
  key: 'eventCoreAdmin',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const admin = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/admin',
        })
      )
      // Null when indexer fails. Undefined if no admin.
      if (admin !== null) {
        return admin || null
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.admin(...params)
    },
})
export const adminNominationSelector = selectorFamily<
  AdminNominationResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['adminNomination']>
  }
>({
  key: 'eventCoreAdminNomination',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const nomination = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/adminNomination',
        })
      )
      // Null when indexer fails. Undefined if no nomination.
      if (nomination !== null) {
        return { nomination: nomination || null }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.adminNomination(...params)
    },
})
export const configSelector = selectorFamily<
  ConfigResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['config']>
  }
>({
  key: 'eventCoreConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/config',
        })
      )
      if (config) {
        return config
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
// Use allCw20BalancesAndInfosSelector as it uses the indexer and implements
// pagination for chain queries.
export const _cw20BalancesSelector = selectorFamily<
  Cw20BalancesResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['cw20Balances']>
  }
>({
  key: 'eventCore_Cw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(undefined))
      get(refreshWalletBalancesIdAtom(queryClientParams.contractAddress))
      return await client.cw20Balances(...params)
    },
})  
// Use allCw20TokenListSelector as it uses the indexer and implements pagination
// for chain queries.
export const _cw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['cw20TokenList']>
  }
>({
  key: 'eventCore_Cw20TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw20TokenList(...params)
    },
})
// Use allCw721TokenListSelector as it uses the indexer and implements
// pagination for chain queries.
export const _cw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['cw721TokenList']>
  }
>({
  key: 'eventCore_Cw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw721TokenList(...params)
    },
})
// Reduced to only the necessary subset which can be provided by both the
// indexer and chain.
export const dumpStateSelector = selectorFamily<
  DumpStateResponse | undefined,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['dumpState']>
  }
>({
  key: 'eventCoreDumpState',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Try indexer first if loading featured mainnet DAO.
      if (
        ((queryClientParams.chainId === undefined &&
          CHAIN_ID === ChainInfoID.Terpnet1) ||
          queryClientParams.chainId === ChainInfoID.Terpnet1) &&
          featuredEvents.some(
          ({ coreAddress }) => coreAddress === queryClientParams.contractAddress
        )
      ) {
        const featuredEventDumpStates = get(featuredEventDumpStatesAtom)
        const dumpedState = featuredEventDumpStates?.find(
          ({ coreAddress }) => coreAddress === queryClientParams.contractAddress
        )
        if (dumpedState) {
          return dumpedState
        }
      }

      const state = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/dumpState',
        })
      )
      if (state) {
        return state
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      try {
        return await client.dumpState(...params)
      } catch (err) {
        // Ignore errors. An undefined response is sometimes used to indicate
        // that this contract is not a DAO.
        console.error(err)
      }
    },
})
export const getItemSelector = selectorFamily<
  GetItemResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['getItem']>
  }
>({
  key: 'eventCoreGetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const item = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/item',
          args: params[0],
        })
      )
      // Null when indexer fails. Undefined if no item.
      if (item !== null) {
        return { item: item || null }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.getItem(...params)
    },
})
// Use listAllItemsSelector as it uses the indexer and implements pagination for
// chain queries.
export const _listItemsSelector = selectorFamily<
  ListItemsResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['listItems']>
  }
>({
  key: 'eventCore_ListItems',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listItems(...params)
    },
})
export const entryModulesSelector = selectorFamily<
EntryModulesResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['entryModules']>
  }
>({
  key: 'eventCoreEntryModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const entryModules = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/entryModule',
        })
      )
      if (entryModules) {
        return entryModules
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.entryModules(...params)
    },
})
export const activeEntryModulesSelector = selectorFamily<
ActiveEntryModulesResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['activeEntryModules']>
  }
>({
  key: 'eventCoreActiveEntryModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const activeEntryModules = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/activeEntryModules',
        })
      )
      if (activeEntryModules) {
        return activeEntryModules
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.activeEntryModules(...params)
    },
})
export const pauseInfoSelector = selectorFamily<
  PauseInfoResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['pauseInfo']>
  }
>({
  key: 'eventCorePauseInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const paused = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/paused',
        })
      )
      if (paused) {
        return paused
      }

      // If indexer fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.pauseInfo(...params)
    },
})
export const judgingModuleSelector = selectorFamily<
  JudgingModuleResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['judgingModule']>
  }
>({
  key: 'eventCoreJudgingModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const judgingModule = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/judgingModule',
        })
      )
      if (judgingModule) {
        return judgingModule
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.judgingModule(...params)
    },
})
// Use listAllSubDaosSelector as it uses the indexer and implements pagination
// for chain queries.
/* export const _listSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['listSubDaos']>
  }
>({
  key: 'daoCoreV2_ListSubDaos',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listSubDaos(...params)
    },
}) */ 
export const eventURISelector = selectorFamily<
EventURIResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['eventURI']>
  }
>({
  key: 'eventCoreEventURI',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const eventURI = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/eventUri',
        })
      )
      // Null when indexer fails. Undefined if no URI.
      if (eventURI !== null) {
        return eventURI || null
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.eventURI(...params)
    },
})
export const judgingPowerAtHeightSelector = selectorFamily<
JudgingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<EventCoreQueryClient['judgingPowerAtHeight']>
  }
>({
  key: 'eventCoreJudgingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshEventJudgingPowerAtom(queryClientParams.contractAddress)
      )

      const judgingPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/judgingPower',
          args: {
            address: params[0].address,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
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
    params: Parameters<EventCoreQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'eventCoreTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(
        refreshEventJudgingPowerAtom(queryClientParams.contractAddress)
      )

      const totalPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/totalPower',
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
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
    params: Parameters<EventCoreQueryClient['info']>
  }
>({
  key: 'eventCoreInfo',
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

      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})

///! Custom selectors

const CW20_TOKEN_LIST_LIMIT = 30
export const allCw20TokenListSelector = selectorFamily<
  Cw20TokenListResponse,
  QueryClientParams
>({
  key: 'eventCoreAllCw20TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/cw20List',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const tokenList: Cw20TokenListResponse = []
      while (true) {
        const response = await get(
          _cw20TokenListSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: tokenList[tokenList.length - 1],
                limit: CW20_TOKEN_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response.length) break

        tokenList.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW20_TOKEN_LIST_LIMIT) {
          break
        }
      }

      return tokenList
    },
})

export const allCw20InfosSelector = selectorFamily<
  {
    address: string
    info: TokenInfoResponse
  }[],
  QueryClientParams & {
    judgingTokenAddress?: string
  }
>({
  key: 'eventCoreAllCw20Infos',
  get:
    ({ judgingTokenAddress, ...queryClientParams }) =>
    async ({ get }) => {
      //! Get all addresses.
      const addresses = [...get(allCw20TokenListSelector(queryClientParams))]

      //! Add governance token balance if exists but missing from list.
      if (
        judgingTokenAddress &&
        !addresses.includes(judgingTokenAddress)
      ) {
        // Add to beginning of list.
        addresses.splice(0, 0, judgingTokenAddress)
      }

      const infos = get(
        waitForAll(
          addresses.map((contractAddress) =>
            Cw20BaseSelectors.tokenInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress,
              params: [],
            })
          )
        )
      )

      return addresses.map((address, index) => ({
        address,
        info: infos[index],
      }))
    },
})

const CW20_BALANCES_LIMIT = 10
export const allCw20BalancesAndInfosSelector = selectorFamily<
  (Cw20BalanceResponse & {
    info: TokenInfoResponse
    imageUrl: string | undefined
    isJudgingToken: boolean
  })[],
  QueryClientParams & {
    judgingTokenAddress?: string
  }
>({
  key: 'eventCoreAllCw20Balances',
  get:
    ({ judgingTokenAddress, ...queryClientParams }) =>
    async ({ get }) => {
      const generalId = get(refreshWalletBalancesIdAtom(undefined))
      const specificId = get(
        refreshWalletBalancesIdAtom(queryClientParams.contractAddress)
      )

      const judgingTokenBalance = judgingTokenAddress
        ? get(
            Cw20BaseSelectors.balanceSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: judgingTokenAddress,
              params: [{ address: queryClientParams.contractAddress }],
            })
          ).balance
        : undefined

      let balances: Cw20BalancesResponse | null = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/cw20Balances',
          // Update each time one of these changes.
          id: generalId + specificId,
        })
      )
      if (balances) {
        // Copy to new array so we can mutate it below.
        balances = [...balances]
        // If indexer query fails, fallback to contract query.
      } else {
        balances = []
        while (true) {
          const response = await get(
            _cw20BalancesSelector({
              ...queryClientParams,
              params: [
                {
                  startAfter: balances[balances.length - 1]?.addr,
                  limit: CW20_BALANCES_LIMIT,
                },
              ],
            })
          )
          if (!response.length) break

          balances.push(...response)

          // If we have less than the limit of items, we've exhausted them.
          if (response.length < CW20_BALANCES_LIMIT) {
            break
          }
        }
      }

      //! Add governance token balance if exists but missing from list.
      if (
        judgingTokenAddress &&
        judgingTokenBalance &&
        !balances.some(({ addr }) => addr === judgingTokenAddress)
      ) {
        // Add to beginning of list.
        balances.splice(0, 0, {
          addr: judgingTokenAddress,
          balance: judgingTokenBalance,
        })
      }

      const infos = get(
        waitForAll(
          balances.map(({ addr }) =>
            Cw20BaseSelectors.tokenInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: addr,
              params: [],
            })
          )
        )
      )

      const cw20LogoUrls = get(
        waitForAll(
          balances.map(({ addr }) =>
            Cw20BaseSelectors.logoUrlSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,
              contractAddress: addr,
            })
          )
        )
      )

      return balances.map((balance, index) => ({
        ...balance,
        info: infos[index],
        imageUrl: cw20LogoUrls[index],
        isJudgingToken:
          !!judgingTokenAddress && judgingTokenAddress === balance.addr,
      }))
    },
})

const CW721_TOKEN_LIST_LIMIT = 30
export const allCw721TokenListSelector = selectorFamily<
  Cw721TokenListResponse,
  QueryClientParams
>({
  key: 'eventCoreAllCw721TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/cw721List',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const tokenList: Cw721TokenListResponse = []
      while (true) {
        const response = await get(
          _cw721TokenListSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: tokenList[tokenList.length - 1],
                limit: CW721_TOKEN_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        tokenList.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW721_TOKEN_LIST_LIMIT) {
          break
        }
      }

      return tokenList
    },
})

// Get all CW721 collections in the DAO's list, filtered by the DAO being the
// minter.
export const allCw721CollectionsWithRewardModuleAsMinterSelector = selectorFamily<
  ({ address: string } & ContractInfoResponse)[],
  QueryClientParams
>({
  key: 'eventCoreAllCw721CollectionsWithRewardModuleAsMinter',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const tokenList: Cw721TokenListResponse = get(
        allCw721TokenListSelector(queryClientParams)
      )
      const minterResponses = get(
        waitForAll(
          tokenList.map((token) =>
            Cw721BaseSelectors.minterSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: token,
              params: [],
            })
          )
        )
      )

      // Filter out collections that don't have the DAO as the minter.
      const collectionsWithRewardModuleAsMinter = tokenList.filter(
        (_, idx) =>
          minterResponses[idx].minter === queryClientParams.contractAddress
      )

      const collectionInfos = get(
        waitForAll(
            collectionsWithRewardModuleAsMinter.map((collection) =>
            Cw721BaseSelectors.contractInfoSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: collection,
              params: [],
            })
          )
        )
      )

      return collectionsWithRewardModuleAsMinter.map((collection, idx) => ({
        address: collection,
        ...collectionInfos[idx],
      }))
    },
})
/*
const SUBDAO_LIST_LIMIT = 30
export const listAllSubDaosSelector = selectorFamily<
  ListSubDaosResponse,
  QueryClientParams
>({
  key: 'daoCoreV2ListAllSubDaos',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoCore/listSubDaos',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const subdaos: ListSubDaosResponse = []

      while (true) {
        const response = await get(
          _listSubDaosSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: subdaos[subdaos.length - 1]?.addr,
                limit: SUBDAO_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        subdaos.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < SUBDAO_LIST_LIMIT) {
          break
        }
      }

      return subdaos
    },
})

export const allSubDaoConfigsSelector = selectorFamily<
  ({ address: string } & ConfigResponse)[],
  QueryClientParams
>({
  key: 'daoCoreV2AllSubDaoConfigs',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const subDaos = get(listAllSubDaosSelector(queryClientParams))
      const subDaoConfigs = get(
        waitForAll(
          subDaos.map(({ addr }) =>
            configSelector({
              // Copies over chainId and any future additions to client params.
              ...queryClientParams,

              contractAddress: addr,
              params: [],
            })
          )
        )
      )

      return subDaos.map(({ addr }, index) => ({
        address: addr,
        ...subDaoConfigs[index],
      }))
    },
}) */

// Will fail if cannot fetch governance token address.
export const tryFetchJudgingTokenAddressSelector = selectorFamily<
  string,
  QueryClientParams
>({
  key: 'eventCoreTryFetchJudgingTokenAddress',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const judgingModuleAddress = get(
        judgingModuleSelector({ ...queryClientParams, params: [] })
      )
      const judgingTokenAddress = get(
        EventJudgingCw20StakedSelectors.tokenContractSelector({
          ...queryClientParams,
          contractAddress: judgingModuleAddress,
          params: [],
        })
      )
      return judgingTokenAddress
    },
})

const ITEM_LIST_LIMIT = 30
export const listAllItemsSelector = selectorFamily<
  ListItemsResponse,
  QueryClientParams
>({
  key: 'eventCoreListAllItems',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const list = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'eventCore/listItems',
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

      const items: ListItemsResponse = []

      while (true) {
        const response = await get(
          _listItemsSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: items[items.length - 1]?.[0],
                limit: ITEM_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        items.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < ITEM_LIST_LIMIT) {
          break
        }
      }

      return items
    },
})