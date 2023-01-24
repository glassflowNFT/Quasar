import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { cosmWasmClientForChainSelector } from './chain'

export const entryExecutionTxHashSelector = selectorFamily<
    string | undefined,
    WithChainId<{ contractAddress: string; entryId: number }>
>({
    key: 'entryExecutionTxHash',
    get:
        ({ contractAddress, entryId, chainId }) =>
            async ({ get }) => {
                const client = get(cosmWasmClientForChainSelector(chainId))

                const events = await client.searchTx({
                    tags: [
                        { key: 'wasm._contract_address', value: contractAddress },
                        { key: 'wasm.entry_id', value: entryId.toString() },
                        { key: 'wasm.action', value: 'execute' },
                    ],
                })

                if (events.length > 1) {
                    console.error('More than one execution', events)
                }

                return events?.[0]?.hash
            },
})