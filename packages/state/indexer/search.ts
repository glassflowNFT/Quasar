import MeiliSearch from 'meilisearch'

import { IndexerDumpState } from '@quasar-vote/types'
import { SEARCH_API_KEY, SEARCH_EVENT_INDEX, SEARCH_HOST } from '@quasar-vote/utils'

let _client: MeiliSearch | undefined

const loadClient = async (): Promise<MeiliSearch> => {
    if (!_client) {
      _client = new MeiliSearch({
        host: SEARCH_HOST,
        apiKey: SEARCH_API_KEY,
      })
    }
  
    return _client
  }

  export interface EventSearchResult {
    contractAddress: string
    codeId: number
    blockHeight: number
    blockTimeUnixMicro: number
    value: IndexerDumpState
  }

  export const searchEvents = async (
    query: string,
    limit?: number,
    exclude?: string[]
  ) => {
    const client = await loadClient()
    const index = client.index(SEARCH_EVENT_INDEX)
  
    const results = await index.search<EventSearchResult>(query, {
      limit,
      filter: [
        // Only show DAOs with proposals to reduce clutter/spam.
        //`(NOT value.proposalCount EXISTS) OR (value.proposalCount > 0)`,
        ...(exclude?.length
          ? // Exclude DAOs that are in the exclude list.
            [`NOT contractAddress IN ["${exclude.join('", "')}"]`]
          : []),
      ]
        .map((filter) => `(${filter})`)
        .join(' AND '),
      // Most recent at the top.
      sort: ['blockHeight:desc'],
    })
  
    return results.hits
  }