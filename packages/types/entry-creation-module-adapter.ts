import { ComponentType } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'
import { RecoilValueReadOnly } from 'recoil'

import { Action } from './actions'
import { ContractVersion } from './chain'
import { Expiration } from './contracts'
import { CheckedDepositInfo } from './contracts/common'

import {
    EventCreationGetInstantiateInfo,
    EventCreationJudgingConfigItem,
    EntryCreationDraft,
    EntryCreationModule,
    EntryCreationPrefill,
  } from './event'
import { EntryCreatedCardProps } from './entry'