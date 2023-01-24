### `/packages/types/contracts/common.ts`
- VoteOption --> GovVoteOption 

### `/packages/types/action.ts`
- DaoInfo --> EventInfo 
- Dao --> Event 
- UpdatePreProposeConfig -->UpdatePreEntryCreationConfig
- UpdateProposalConfig --> 

### `/packages/types/chain.ts`
- ContractVersions --> QuasarContractVersions && DAOContractVersions

### `/packages/types/entry-creation-module-adapter.ts`
- ProposalCreatedCardProps --> EntryCreatedCardProps

### `/packages/types/entry.ts`
- ProposalCreatedCardProps --> EntryCreatedCardProps

### `/packages/types/event.ts`
- DaoCardProps --> EventCardProps 
- DaoInfo --> EventInfo
- DaoInfoSerializable --> EventInfoSerializable
- ProposalModule --> EntryCreationModule 
- preProposeAddress --> preEntryCreationAddress 
- ProposalPrefill --> EntryCreationPrefill
- ProposalDraft --> EntryCreationDraft
- CreateDaoCustomValidator --> CreateEventCustomMerchStore
- CreateDaoContext --> CreateEventContext
- availableVotingModuleAdapters --> availableJudgingModuleAdapters
- votingModuleAddress --> judgingModuleAddress
- votingModuleContractName --> judgingModuleContractName
- VotingModuleAdapter --> JudgingModuleAdapter
- VotingModuleAdapterModuleData --> JudgingModuleAdapterModuleData 
- votingModuleDaoCreationAdapter --> judgingModuleEventCreationAdapter
- proposalModuleDaoCreationAdapters --> entryCreationModuleEventCreationAdapters
- DaoCoreV2InstantiateMsg --> EventCoreInstantiateMsg 
- setCustomValidator --> setCustomMerchStore
- NewDao --> NewEvent 
- VotingModuleAdapterData -- JudgingModuleAdapterData 
- proposalModuleAdapters --> entryCreationModuleAdapters
- NewDaoTier --> NewEventTier
- NewDaoTierMember --> NewEventTierMember
- DaoCreationGovernanceConfigInputProps --> EventCreationAdminConfigInputProps 
- DaoCreationGovernanceConfigReviewProps --> EventCreationAdminConfigReviewProps 
- DaoCreationVotingConfigItemInputProps --> EventCreationJudgingConfigItemInputProps
- DaoCreationVotingConfigItemReviewProps --> EventCreationJudgingConfigItemReviewProps
- DaoCreationVotingConfigItem --> EventCreationJudgingConfigItem
- DaoCreationGetInstantiateInfo --> EventCreationGetInstantiateInfo 
- DaoCreatedCardProps --> EventCreatedCardProps

### `/packages/types/stateless/EventCard.ts`
- DaoCard --> EventCard
- DaoCardInfo --> EventCardInfo
- DaoParentInfo --> EventParentInfo
- DaoCardInfoLazyData --> EventCardInfoLazyData 
- parentDao --> parentEvent 
- DaoParentInfo --> EventParentInfo 
### `/packages/types/stateless/EventDropdown.ts`
- DaoDropdownInfo --> EventDropdownInfo
- subdaos --> subevents
- showSubdaos --> showSubEvents

### `/packages/types/stateless/EventInfoBar.ts`
- DaoInfoBarItem --> EventInfoBarItem
- DaoInfoBarProps --> EventInfoBarProps
### `/packages/types/indexer.ts`
- ProposalModuleWithInfo --> EntryCreationModuleWithInfo 
- votingModuleInfo --> judgingModuleInfo
- proposalCount --> entryCount

### `/packages/types/utils.ts`
- DaoCore --> EventCore
- DaoVotingCw4 --> EventVotingCw4

### `/packages/types/judging-module-adapter.ts`
- DaoInfoBarItem --> EventInfoBarItem

### `/packages/stateful/components/EventPageWrapper`
- DaoPageWrapper --> EventPageWrapper

### `/packages/stateful/command/contexts/generic`
- CommandModalDaoInfo --> CommandModalEventInfo

### `/packages/stateful/command/hooks`
- usePinnedAndFilteredDaoSections --> usePinnedAndFilteredEventsSections

### `/packages/stateful/hooks` 

### `/packages/stateful/server/makeGetEventStaticProps`
- makeGetDaoStaticProps --> makeGetEventStaticProps
