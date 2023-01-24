import { TFunction } from 'next-i18next'
import { ComponentType } from 'react'
import {
    FieldError,
    FieldErrors,
    FieldPath,
    FieldPathValue,
    FieldValues,
    FormState,
    UseFormRegister,
    UseFormReturn,
    UseFormSetValue,
} from 'react-hook-form'

import { ContractVersion, Validator } from './chain'
import { ModuleInstantiateInfo } from './contracts/common'
import { InstantiateMsg as EventCoreInstantiateMsg } from './contracts/EventCore'
import { EntryCreationModuleAdapter } from './entry-creation-module-adapter'
import { AmountWithTimestamp } from './state'
import { EventCardProps, LoadingData, SuspenseLoaderProps } from './stateless'
import { JudgingModuleAdapter } from './judging-module-adapter'

// Used in EventInfoContext in @dao-dao/stateful/components/DaoPageWrapper
export interface EventInfo {
    chainId: string
    bech32Prefix: string
    coreAddress: string
    coreVersion: ContractVersion
    judgingModuleAddress: string
    judgingModuleContractName: string
    entryCreationModules: EntryCreationModule[]
    name: string
    description: string
    imageUrl: string | null
    created: Date | undefined
}

// Used in @dao-dao/stateful/components/DaoPageWrapper to serialize DaoInfo loaded
// via static props (@dao-dao/stateful/server/makeGetEventStaticProps) to be fed
// into EventPageWrapper and available in the UI via EventInfoContext.
export interface EventInfoSerializable extends Omit<EventInfo, 'created'> {
    // Created needs to be serialized and de-serialized.
    created: string | null
}

export enum UnstakingTaskStatus {
    Unstaking = 'unstaking',
    ReadyToClaim = 'readyToClaim',
    Claimed = 'claimed',
}

export interface UnstakingTask {
    status: UnstakingTaskStatus
    amount: number
    tokenSymbol: string
    tokenDecimals: number
    // If unstaking or ready to claim, date it will be/was unstaked.
    // If claimed, date it was claimed.
    date?: Date
}

export interface TokenStake {
    validator: Validator
    amount: number
    rewards: number
    denom: string
    symbol: string
    decimals: number
}

export interface TokenCardLazyInfo {
    usdcUnitPrice: AmountWithTimestamp | undefined
    stakingInfo:
    | {
        unstakingTasks: UnstakingTask[]
        unstakingDurationSeconds: number | undefined
        stakes: TokenStake[]
    }
    | undefined
}

export interface TokenCardInfo {
    crown?: boolean
    tokenSymbol: string
    tokenDenom: string
    tokenDecimals: number
    subtitle?: string
    imageUrl: string
    unstakedBalance: number
    // Defined if this is a Cw20 token.
    cw20Address?: string

    // Only native tokens load staking info for now, so let's show a nice loader.
    hasStakingInfo: boolean

    lazyInfo: LoadingData<TokenCardLazyInfo>
}

export interface NftCardInfo {
    collection: {
        address: string
        name: string
    }
    tokenId: string
    externalLink?: {
        href: string
        name: string
    }
    imageUrl?: string
    floorPrice?: {
        amount: number
        denom: string
    }
    name: string
    chainId: string
}

export interface EntryCreationModule {
    contractName: string
    version: ContractVersion | null
    address: string
    prefix: string
    // If set, this uses a pre-propose module.
    preEntryCreationAddress: string | null
}

export interface EntryCreationPrefill<FormData> {
    // EntryCreation module adapter ID
    id: string
    // EntryCreation module adapter entry creation form data
    data: FormData
}

export interface EntryCreationDraft<FormData = any> {
    name: string
    createdAt: number
    lastUpdatedAt: number
    proposal: EntryCreationPrefill<FormData>
}

//! Create DAO

// export type CreateEventCustomMerchStore = (setNewErrors: boolean) => void

export interface CreateEventContext<
    JudgingModuleAdapterModuleData extends FieldValues = any
> {
    form: UseFormReturn<NewEvent<JudgingModuleAdapterModuleData>>
    availableJudgingModuleAdapters: Pick<
        Required<JudgingModuleAdapter>,
        'id' | 'eventCreation'
    >[]
    judgingModuleEventCreationAdapter: Required<JudgingModuleAdapter>['eventCreation']
    entryCreationModuleEventCreationAdapters: Required<EntryCreationModuleAdapter>['eventCreation'][]
    generateInstantiateMsg: () => EventCoreInstantiateMsg
    //  setCustomMerchStore: (fn: CreateEventCustomMerchStore) => void
    SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export interface NewEvent<JudgingModuleAdapterData extends FieldValues = any> {
    name: string
    description: string
    imageUrl?: string
    votingModuleAdapter: {
        id: string
        data: JudgingModuleAdapterData
    }
    entryCreationModuleAdapters: {
        id: string
        data: any
    }[]
    advancedVotingConfigEnabled: boolean
}

export interface NewEventTier {
    name: string
    weight: number
    members: NewEventTierMember[]
    // For custom errors.
    _error?: undefined
}

export interface NewEventTierMember {
    address: string
}

export interface EventCreationAdminConfigInputProps<
JudgingModuleAdapterData extends FieldValues = any
> {
  data: JudgingModuleAdapterData
  // Used within a voting module adapter, so it's safe to apply the data
  // generic.
  context: CreateEventContext<JudgingModuleAdapterData>
}

export interface EventCreationAdminConfigInputProps<
JudgingModuleAdapterData extends FieldValues = any
> {
  // Used within a voting module adapter, so it's safe to apply the data
  // generic.
  newEvent: NewEvent<JudgingModuleAdapterData>
  data: JudgingModuleAdapterData
}

export interface EventCreationJudgingConfigItemInputProps<
  ModuleData extends FieldValues = any
> {
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newEvent: NewEvent<any>
  data: ModuleData
  register: UseFormRegister<ModuleData>
  setValue: UseFormSetValue<ModuleData>
  watch: <TFieldName extends FieldPath<ModuleData>>(
    name: TFieldName,
    defaultValue?: FieldPathValue<ModuleData, TFieldName>
  ) => FieldPathValue<ModuleData, TFieldName>
  errors?: FormState<ModuleData>['errors']
}

export interface EventCreationJudgingConfigItemReviewProps<
  ModuleData extends FieldValues = any
> {
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newEvent: NewEvent<any>
  data: ModuleData
}

export interface EventCreationJudgingConfigItem<
  ModuleData extends FieldValues = any
> {
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  onlyDisplayCondition?: (newEvent: NewEvent<any>) => boolean
  Icon: ComponentType
  nameI18nKey: string
  descriptionI18nKey: string
  tooltipI18nKey?: string
  Input: ComponentType<EventCreationJudgingConfigItemInputProps<ModuleData>>
  getInputError: (errors?: FieldErrors<ModuleData>) => FieldError | undefined
  Review: ComponentType<EventCreationJudgingConfigItemReviewProps<ModuleData>>
  getReviewClassName?: (data: ModuleData) => string
}

export type EventCreationGetInstantiateInfo<
  ModuleData extends FieldValues = any
> = (
  // Used within voting and proposal module adapters, so the data generic passed
  // in may not necessarily be the voting module adapter data. Must use `any`.
  newDao: NewEvent<any>,
  data: ModuleData,
  t: TFunction
) => ModuleInstantiateInfo

export type EventCreatedCardProps = Omit<
EventCardProps,
  'pinned' | 'onPin' | 'LinkWrapper' | 'IconButtonLink'
>