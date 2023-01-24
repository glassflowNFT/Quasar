import { atom, atomFamily } from 'recoil'

import { EntryDraft } from '@quasar-vote/types'
import { EntryCreatedCardProps } from '@quasar-vote/types/entry'

import { localStorageEffectJSON } from '../effects'

// Store entry ID list endings for entry pagination for the given
// coreAddress. Map list index to its ending for each entry module address.
export const entryStartBeforesAtom = atomFamily<
Record<number, Record<string, number | undefined> | undefined>,
string
>({
    key: 'entryStartBefores',
  // Start first list (index 0) at the beginning.
  // It uses the previous list's ending as its starting point, so
  // set index -1 to undefined so startBefore is initially undefined.
  default: { [-1]: undefined },
})

// Count of entry lists that have been loaded for the given coreAddress. Each
// 'load more' action increments this.
export const entryListCountAtom = atomFamily<number, string>({
    key: 'entryListCount',
    default: 1,
  })

// Store proposal drafts per Event.
export const entryDraftsAtom = atomFamily<EntryDraft[], string>({
    key: 'entryDrafts',
    default: [],
    effects: [localStorageEffectJSON],
  })

// Store latest entry form state per Event.
export const latestEntrySaveAtom = atomFamily<any, string>({
    key: 'latestEntrySave',
    default: {},
    effects: [localStorageEffectJSON],
  })
// When set, shows proposal created modal with these props for the ProposalCard
// shown.
export const entryCreatedCardpropsAtom = atom<
  EntryCreatedCardProps | undefined
>({
  key: 'entryCreatedCardprops',
  default: undefined,
})