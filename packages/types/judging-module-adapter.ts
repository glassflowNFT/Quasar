import { ComponentType } from 'react'
import { FieldValues } from 'react-hook-form'

import { Action } from './actions'
import { Duration } from './contracts/common'
import { TokenInfoResponse } from './contracts/Cw20Base'
import { Claim } from './contracts/stake-cw20'

import {
    EventCreationGetInstantiateInfo,
    EventCreationAdminConfigInputProps,
    EventCreationAdminConfigReviewProps,
    EventCreationJudgingConfigItem,
  } from './event'

