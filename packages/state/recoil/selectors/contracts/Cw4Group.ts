import { selectorFamily } from 'recoil'

import { WithChainId } from '@quasar-vote/types'
import {
  AdminResponse,
  HooksResponse,
  ListMembersResponse,
  MemberResponse,
  TotalWeightResponse,
} from '@quasar-vote/types/contracts/Cw4Group'

import { Cw4GroupQueryClient } from '../../../contracts/Cw4Group'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
    contractAddress: string
  }>

  export const queryClient = selectorFamily<
  Cw4GroupQueryClient,
  QueryClientParams
>({
  key: 'cw4GroupQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw4GroupQueryClient(client, contractAddress)
    },
})

export const adminSelector = selectorFamily<
  AdminResponse,
  QueryClientParams & {
    params: Parameters<Cw4GroupQueryClient['admin']>
  }
>({
  key: 'cw4GroupAdmin',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const admin = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw4Group/admin',
        })
      )
      // Null when indexer fails. Undefined if no admin.
      if (admin !== null) {
        return { admin: admin || null }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.admin(...params)
    },
})

export const totalWeightSelector = selectorFamily<
  TotalWeightResponse,
  QueryClientParams & {
    params: Parameters<Cw4GroupQueryClient['totalWeight']>
  }
>({
  key: 'cw4GroupTotalWeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const weight = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw4Group/totalWeight',
        })
      )
      if (typeof weight === 'number') {
        return { weight }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalWeight(...params)
    },
})
// Used by listAllMembersSelector as an indexer fallback.
export const _listMembersSelector = selectorFamily<
  ListMembersResponse,
  QueryClientParams & {
    params: Parameters<Cw4GroupQueryClient['listMembers']>
  }
>({
  key: 'cw4Group_ListMembers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listMembers(...params)
    },
})
export const memberSelector = selectorFamily<
  MemberResponse,
  QueryClientParams & {
    params: Parameters<Cw4GroupQueryClient['member']>
  }
>({
  key: 'cw4GroupMember',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const weight = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw4Group/member',
          args: {
            address: params[0].addr,
          },
        })
      )
      if (typeof weight === 'number') {
        return { weight }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.member(...params)
    },
})
export const hooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<Cw4GroupQueryClient['hooks']>
  }
>({
  key: 'cw4GroupHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.hooks(...params)
    },
})

///! Custom selectors

const LIST_MEMBERS_LIMIT = 10
export const listAllMembersSelector = selectorFamily<
  ListMembersResponse,
  QueryClientParams
>({
  key: 'cw4GroupListAllMembers',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const membersList = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw4Group/listMembers',
        })
      )
      if (membersList) {
        return { members: membersList }
      }

      // If indexer query fails, fallback to contract query.

      let startAfter: string | undefined

      const members: ListMembersResponse['members'] = []
      while (true) {
        const response = await get(
          _listMembersSelector({
            ...queryClientParams,
            params: [{ startAfter, limit: LIST_MEMBERS_LIMIT }],
          })
        )
        if (!response.members.length) break

        members.push(...response.members)
        startAfter = response.members[response.members.length - 1].addr

        // If we have less than the limit of items, we've exhausted them.
        if (response.members.length < LIST_MEMBERS_LIMIT) break
      }

      return { members }
    },
})