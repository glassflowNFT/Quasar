import { atom, atomFamily } from 'recoil'

/* 
// Change this to refresh claims for the given wallet.
export const refreshClaimsIdAtom = atomFamily<number, string | undefined>({
  key: 'refreshClaimsId',
  default: 0,
})
*/
// Change this to refresh token balances for the given wallet or the total.
export const refreshWalletBalancesIdAtom = atomFamily<
  number,
  string | undefined
>({
  key: 'refreshWalletBalancesId',
  default: 0,
}) 

// Change this to refresh information for the given entry from the
// given entry module.
export const refreshEntryIdAtom = atomFamily<
  number,
  { address: string; entryId: number }
>({
  key: 'refreshEntryId',
  default: 0,
})

// Change this to refresh all proposals.
export const refreshEntriesIdAtom = atom<number>({
    key: 'refreshEntriesId',
    default: 0,
  })

  // Change this to refresh the token USDC price for a denom, or use an empty
// string to refresh all prices at once.
export const refreshTokenUsdcPriceAtom = atomFamily<number, string>({
  key: 'refreshTokenUsdcPrice',
  default: 0,
})

// Change this to refresh the current block height.
export const refreshBlockHeightAtom = atom<number>({
  key: 'refreshBlockHeight',
  default: 0,
})

// Change this to refresh the list of stargaze NFTs for a wallet.
export const refreshWalletStargazeNftsAtom = atomFamily<number, string>({
    key: 'refreshWalletStargazeNfts',
    default: 0,
  })

  // Change this to refresh the profile for a wallet.
export const refreshWalletProfileAtom = atomFamily<number, string>({
  key: 'refreshWalletProfile',
  default: 0,
})

// Change this to refresh native token staking info for the given address.
export const refreshNativeTokenStakingInfoAtom = atomFamily<
  number,
  string | undefined
>({
  key: 'refreshNativeTokenStakingInfo',
  default: 0,
})

// Change this to refresh voting power info for a DAO given its core address.
export const refreshEventJudgingPowerAtom = atomFamily<number, string>({
    key: 'refreshEventVotingPower',
    default: 0,
  })

  // Change this to refresh open entries.
export const refreshOpenEntriesAtom = atom({
  key: 'refreshOpenEntries',
  default: 0,
})

// Change this to refresh wallet proposal stats.
export const refreshWalletEntryStatsAtom = atom({
    key: 'refreshWalletEntryStats',
    default: 0,
  })