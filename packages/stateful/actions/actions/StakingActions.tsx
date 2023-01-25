import { parseCoins } from '@cosmjs/amino'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import {
    nativeBalancesSelector,
    nativeDelegationInfoSelector,
    nativeUnstakingDurationSecondsSelector,
    validatorsSelector,
} from '@dao-dao/state'

import {
    ActionCardLoader,
    DepositEmoji,
    useCachedLoadable,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
/* import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  StakeType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  makeDistributeMessage,
  makeStakingMessage,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../components/SuspenseLoader'
import { useExecutedProposalTxEventsLoadable } from '../../hooks'
import {
  StakeData,
  StakeComponent as StatelessStakeComponent,
  useStakeActions,
} from '../components/StakingActions'
import { useActionOptions } from '../react' */
