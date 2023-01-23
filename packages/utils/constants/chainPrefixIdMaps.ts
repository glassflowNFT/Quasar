import { ChainInfoID } from '@xiti/cosmodal'

import { ChainPrefixIdMap } from '@quasar-votes/types'

const testnet: ChainPrefixIdMap = {
    terp: ChainInfoID.Terpnet1,
}

const mainnet: ChainPrefixIdMap = {
    terp: ChainInfoID.Terpnet2,
}

export const ChainPrefixIdMaps = {
    testnet,
    mainnet,
  }
  