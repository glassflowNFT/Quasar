import MeiliSearch from 'meilisearch'

// import { IndexerDumpState } from '@quasar-vote/types'
// import { SEARCH_API_KEY, SEARCH_DAOS_INDEX, SEARCH_HOST } from '@quasar-vote/utils'

let _client: MeiliSearch | undefined

/* const loadClient = async (): Promise<MeiliSearch> => {
    if (!_client) {
      _client = new MeiliSearch({
        host: SEARCH_HOST,
        apiKey: SEARCH_API_KEY,
      })
    }
  
    return _client
  }
*/