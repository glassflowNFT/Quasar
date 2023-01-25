import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import { BabyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
    NATIVE_DECIMALS,
    convertDenomToMicroDenomWithDecimals,
    convertMicroDenomToDenomWithDecimals,
    makeWasmMessage,
  } from '@dao-dao/utils'

 // import { useExecutedProposalTxEventsLoadable } from '../../hooks/useExecutedProposalTxEvents'
 import { InstantiateComponent as StatelessInstantiateComponent } from '../components/Instantiate'
 import { useActionOptions } from '../react'

interface InstantiateData {
    admin: string
    codeId: number
    label: string
    message: string
    funds: { denom: string; amount: number }[]
}

const useTransformToCosmos: UseTransformToCosmos<InstantiateData> = () =>
  useCallback(({ admin, codeId, label, message, funds }: InstantiateData) => {
    let msg
    try {
      msg = JSON5.parse(message)
    } catch (err) {
      console.error(`internal error. unparsable message: (${message})`, err)
      return
    }

    return makeWasmMessage({
      wasm: {
        instantiate: {
          admin: admin || null,
          code_id: codeId,
          funds: funds.map(({ denom, amount }) => ({
            denom,
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              NATIVE_DECIMALS
            ).toString(),
          })),
          label,
          msg,
        },
      },
    })
  }, [])