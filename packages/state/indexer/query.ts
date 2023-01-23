import { ChainInfoID } from '@xiti/cosmodal'

import { WithChainId } from '@quasar-vote/types'
import { CHAIN_ID, SITE_URL, fetchWithTimeout } from '@quasar-vote/utils'

/*
export type QueryIndexerOptions = WithChainId<{
  args?: Record<string, any>
  block?: {
    height: number
    // Most formulas do not need the time, so make it optional.
    timeUnixMs?: number
  }
  baseUrl?: string
}>
*/