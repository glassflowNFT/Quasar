import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import { EventCoreSelectors } from '@dao-dao/state/recoil'
import { ImageEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { ManageCw721Component as StatelessManageCw721Component } from '../components/ManageCw721'
import { useActionOptions } from '../react'

interface ManageCw721Data {
    adding: boolean
    address: string
  }
  
  export const useDefaults: UseDefaults<ManageCw721Data> = () => ({
    adding: true,
    address: '',
  })