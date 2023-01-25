import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { EventCoreSelectors } from '@dao-dao/state/recoil'
import { TokenEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { ManageCw20Component as StatelessManageCw20Component } from '../components/ManageCw20'
import { useActionOptions } from '../react'

interface ManageCw20Data {
    adding: boolean
    address: string
  }
  
  const useDefaults: UseDefaults<ManageCw20Data> = () => ({
    adding: true,
    address: '',
  })