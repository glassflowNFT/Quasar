import JSON5 from 'json5'
import { useCallback, useMemo, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import { WhaleEmoji } from '@dao-dao/stateless'
import {
    ActionComponent,
    ActionMaker,
    CoreActionKey,
    UseDecodedCosmosMsg,
    UseDefaults,
    UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage } from '@dao-dao/utils'

import { MigrateContractComponent as StatelessMigrateContractComponent } from '../components/MigrateContract'

interface MigrateData {
    contract: string
    codeId: number
    msg: string
}

const useDefaults: UseDefaults<MigrateData> = () => ({
    contract: '',
    codeId: 0,
    msg: '{}',
})