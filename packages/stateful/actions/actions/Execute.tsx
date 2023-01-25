import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import { SwordsEmoji } from '@dao-dao/stateless'
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

import { ExecuteComponent as StatelessExecuteComponent } from '../components/Execute'
import { useActionOptions } from '../react'


interface ExecuteData {
    address: string
    message: string
    funds: { denom: string; amount: number }[]
}


const useDefaults: UseDefaults<ExecuteData> = () => ({
    address: '',
    message: '{}',
    funds: [],
})