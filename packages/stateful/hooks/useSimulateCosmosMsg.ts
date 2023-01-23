import { cosmos } from 'interchain-rpc'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { cosmosRpcClientForChainSelector } from '@quasar-vote/state/recoil'
import { CosmosMsgFor_Empty } from '@quasar-vote/types'
import { cwMsgToEncodeObject, typesRegistry } from '@quasar-vote/utils'

export interface UseSimulateCosmosMsgsOptions {
  senderAddress: string
  chainId?: string
}

const { SignMode } = cosmos.tx.signing.v1beta1
const { AuthInfo, Fee, Tx, TxBody, SimulateRequest } = cosmos.tx.v1beta1

// Simulate executing Cosmos messages on-chain. We can't just use the simulate
// function on SigningCosmWasmClient or SigningStargateClient because they
// include signer info from the wallet. We may want to simulate these messages
// coming from a DAO, so we don't want wallet signing info included. Those
// simulate functions internally call this function:
// https://github.com/cosmos/cosmjs/blob/2c3b27eeb3622a6108086267ba6faf3984251be3/packages/stargate/src/modules/tx/queries.ts#L47
// We can copy this simulate function and leave out the wallet-specific fields
// (i.e. sequence) and unnecessary fields (i.e. publicKey, memo) to simulate
// these messages from a DAO address.
export const useSimulateCosmosMsgs = ({
  senderAddress,
  chainId,
}: UseSimulateCosmosMsgsOptions) => {
  const cosmosRpcClient = useRecoilValue(
    cosmosRpcClientForChainSelector(chainId)
  )

  const simulate = useCallback(
    async (msgs: CosmosMsgFor_Empty[]): Promise<void> => {
      // If no messages, nothing to simulate.
      if (msgs.length === 0) {
        return
      }

      const encodeObjects = msgs.map((msg) => {
        const encoded = cwMsgToEncodeObject(msg, senderAddress)
        return typesRegistry.encodeAsAny(encoded)
      })

      const tx = Tx.fromPartial({
        authInfo: AuthInfo.fromPartial({
          fee: Fee.fromPartial({}),
          signerInfos: [
            {
              modeInfo: {
                single: {
                  mode: SignMode.SIGN_MODE_UNSPECIFIED,
                },
              },
            },
          ],
        }),
        body: TxBody.fromPartial({
          messages: encodeObjects,
          memo: '',
        }),
        signatures: [new Uint8Array()],
      })

      const request = SimulateRequest.fromPartial({
        txBytes: Tx.encode(tx).finish(),
      })

      await cosmosRpcClient.tx.v1beta1.simulate(request)
    },
    [cosmosRpcClient.tx.v1beta1, senderAddress]
  )

  return simulate
}
