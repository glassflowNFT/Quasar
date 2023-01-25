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

### `/packages/types/stateless/EventMemberCard.ts`
- DaoMemberCardProps --> EventMemberCardProps

### `/packages/types/stateless/ProfileNewEntryCreationCard.ts`
- ProfileNewProposalCardInfoLine --> ProfileNewEntryCreationCard
- ProfileNewProposalCardAddress --> ProfileNewEntryCreationCardAddress
- ProfileNewProposalCardInfoLine --> ProfileNewEntryCreationCardInfoLine
- ProfileNewProposalCardProps --> ProfileNewEntryCreationCardProps

### `/packages/types/stateless/Navigation.ts`
- DaoDropdownInfo --> EventDropdownInfo
- DaoDropdown --> EventDropdown
- pinnedDaos --> pinnedEvents

### `/packages/types/indexer.ts`
- ProposalModuleWithInfo --> EntryCreationModuleWithInfo 
- votingModuleInfo --> judgingModuleInfo
- proposalCount --> entryCount

### `/packages/types/utils.ts`
- DaoCore --> EventCore
- DaoVotingCw4 --> EventVotingCw4

### `/packages/types/judging-module-adapter.ts`
- DaoInfoBarItem --> EventInfoBarItem

### `/packages/state/contracts/EventJudgingCw4.ts`
- DaoVotingCw4 --> EventJudgingCw4
- DaoVotingCw4Client --> EventJudgingCw4Client
- DaoResponse --> EventResponse 
- DaoVotingCw4ReadOnlyInterface --> EventJudgingCw4ReadOnlyInterface
- DaoVotingCw4QueryClient --> EventJudgingCw4QueryClient
- DaoVotingCw4Interface --> EventJudgingCw4Interface 

### `/packages/state/indexer/search.ts` 
- DaoSearchResult --> EventSearchResult

### `/packages/state/indexer/query.ts` 
- queryFeaturedDaoDumpStatesFromIndexer --> queryFeaturedEventDumpStatesFromIndexer

### `/packages/state/recoil/atoms/refresh.ts`
- refreshProposalIdAtom --> refreshEntryIdAtom
- refreshProposalsIdAtom --> refreshEntriesIdAtom
- proposalId --> entryId
- refreshDaoVotingPowerAtom --> refreshEventJudgingPowerAtom
- refreshOpenProposalsAtom --> refreshOpenEntriesAtom
- refreshWalletProposalStatsAtom --> refreshWalletEntryStatsAtom

### `/packages/state/recoil/atoms/entries.ts`
- ProposalDraft --> EntryDraft
- ProposalCreatedCardProps --> EntryCreatedCardProps
- proposalStartBeforesAtom --> entryStartBeforesAtom
- proposalListCountAtom --> entryListCountAtom 
- proposalDraftsAtom --> entryDraftsAtom 
- proposalDrafts --> entryDrafts
- latestProposalSaveAtom --> latestEntrySaveAtom
- latestProposalSave --> latestEntrySave
- proposalCreatedCardPropsAtom --> entryCreatedCardpropsAtom

### `/packages/state/recoil/selectors/contract.ts`
- DaoCoreV2Selectors --> EventCoreSelectors
- SEARCH_DAOS_INDEX --> SEARCH_EVENT_INDEX

### `/packages/state/recoil/selectors/contract/EventJudgingCw4.ts`
- DaoResponse --> EventResponse
- daoVotingCw4QueryClient --> eventJudgingCw4QueryClient
- DaoVotingCw4QueryClient --> EventJudgingCw4QueryClient
- daoVotingCw4ExecuteClient --> eventJudgingCw4ExecuteClient
- daoVotingCw4GroupContract --> eventJudgingCw4GroupContract
- daoVotingCw4/groupContract --> eventJudgingCw4/groupContract
- daoVotingCw4Dao --> eventJudgingCw4Event
- daoVotingCw4/dao --> eventJudgingCw4/event
- daoSelector --> eventSelector
- daoVotingCw4VotingPowerAtHeight --> eventJudgingCw4JudgingPowerAtHeight
- votingPowerAtHeightSelector --> judgingPowerAtHeightSelector
- VotingPowerAtHeightResponse --> JudgingPowerAtHeightResponse
- votingPowerAtHeight --> judgingPowerAtHeight
- votingPower --> judgingPower
- daoVotingCw4/votingPower --> eventJudgingCw4/judgingPower
- daoVotingCw4/totalPower --> eventJudgingCw4/totalPower
- daoVotingCw4TotalPowerAtHeight --> eventJudgingCw4TotalPowerAtHeight
- daoVotingCw4Info --> eventJudgingCw4Info

### `/packages/state/recoil/selectors/contract/EventCore.ts`
- DaoCoreV2 --> EventCore
- ActiveProposalModulesResponse --> ActiveEntriesModulesResponse
- DaoURIResponse --> EventURIResponse
- daoURI --> eventURI
- ProposalModulesResponse --> EntryModulesResponse
- VotingModuleResponse --> JudgingModuleResponse
- VotingPowerAtHeightResponse --> JudgingPowerAtHeightResponse
- DaoVotingCw20StakedSelectors --> EventJudgingCw20StakedSelectors
- DaoCoreV2Client --> EventCoreClient 
- DaoCoreV2QueryClient --> EventCoreQueryClient
- daoCoreV2QueryClient --> eventCoreQueryClient
- featuredDaos --> featuredEvents 
- daoCoreV2ExecuteClient --> eventCoreExecuteClient
- daoCoreV2Admin --> eventCoreAdmin
- daoCore/admin --> eventCore/admin
- daoCoreV2AdminNomination --> eventCoreAdminNomination
- daoCore/adminNomination --> eventCore/adminNomination
- daoCoreV2Config --> eventCoreConfig
- daoCore/config --> eventCore/config
- daoCoreV2_Cw20Balances --> eventCore_Cw20Balances
- daoCoreV2_Cw20TokenList --> eventCore_Cw20TokenList
- daoCoreV2_Cw721TokenList --> eventCore_Cw721TokenList
- daoCoreV2DumpState --> eventCoreDumpState
- daoCore/dumpState --> eventCore/dumpState
- daoCoreV2GetItem --> eventCoreGetItem
- daoCore/item --> eventCore/item
- daoCoreV2_ListItems --> eventCore_ListItems
- proposalModulesSelector --> entryModulesSelector
- proposalModules --> entryModules
- daoCoreV2ProposalModules --> eventCoreEntryModules
- daoCore/proposalModules --> eventCore/entryModule
- activeProposalModulesSelector --> activeEntryModulesSelector
- activeProposalModules --> activeEntryModules
- daoCoreV2ActiveProposalModules --> eventCoreActiveEntryModules
- daoCore/activeProposalModules --> eventCore/activeEntryModules
- daoCoreV2PauseInfo --> eventCorePauseInfo
- daoCore/paused --> eventCore/paused
- votingModuleSelector --> judgingModuleSelector
- votingModule --> judgingModule
- daoCoreV2VotingModule --> eventCoreJudgingModule
- daoCore/votingModule --> eventCore/judgingModule
- ListSubDaosResponse --> 
- daoCoreV2DaoURI --> eventCoreEventURI
- daoCore/daoUri --> eventCore/eventUri
- daoCoreV2VotingPowerAtHeight --> eventCoreJudgingPowerAtHeight
- daoCore/votingPower --> eventCore/judgingPower
- daoCoreV2TotalPowerAtHeight --> eventCoreTotalPowerAtHeight
- daoCore/totalPower --> eventCore/totalPower
- daoCoreV2Info --> eventCoreInfo
- daoCoreV2AllCw20TokenList --> eventCoreAllCw20TokenList
- daoCore/cw20List --> eventCore/cw20List
- daoCoreV2AllCw20Infos --> eventCoreAllCw20Infos
- governanceTokenAddress --> judgingTokenAddress
- isGovernanceToken --> isJudgingToken
- daoCoreV2AllCw20Balances --> eventCoreAllCw20Balances
- governanceTokenBalance --> judgingTokenBalance
- daoCore/cw20Balances --> eventCore/cw20Balances 
- daoCoreV2AllCw721TokenList --> eventCoreAllCw721TokenList
- daoCore/cw721List --> eventCore/cw721List
- allCw721CollectionsWithDaoAsMinterSelector --> allCw721CollectionsWithRewardModuleAsMinterSelector
- daoCoreV2AllCw721CollectionsWithDaoAsMinter --> eventCoreAllCw721CollectionsWithRewardModuleAsMinter
- collectionsWithDaoAsMinter --> collectionsWithRewardModuleAsMinter
- tryFetchGovernanceTokenAddressSelector --> tryFetchJudgingTokenAddressSelector
- daoCoreV2TryFetchGovernanceTokenAddress --> eventCoreTryFetchJudgingTokenAddress
- daoCoreV2ListAllItems --> eventCoreListAllItems
- daoCore/listItems --> eventCore/listItems

### `/packages/state/recoil/selectors/entry.ts`
- proposalExecutionTXHashSelector --> entryExecutionTxHashSelector
- wasm.proposal_id --> wasm.entry_id

### `/packages/state/recoil/selectors/indexer.ts`
- DaoSearchResult --> EventSearchResult
- searchDaos --> searchEvents
- searchDaosSelector --> searchEventsSelector
- openProposalsSelector --> openEntriesSelector
- openProposals --> openEntries
- daoCore/openProposals --> eventCore/openEntries
- walletProposalStatsSelector --> walletEntryStatsSelector
- walletProposalStats --> walletEntryStats
- proposals/stats --> entries/stats
- featuredDaoDumpStatesAtom --> featuredEventDumpStatesAtom
- featuredDaoDumpStates --> featuredEventDumpStates

### `/packages/stateful/components/EventPageWrapper`
- DaoPageWrapper --> EventPageWrapper

### `/packages/stateful/command/contexts/generic`
- CommandModalDaoInfo --> CommandModalEventInfo

### `/packages/stateful/command/hooks`
- usePinnedAndFilteredDaoSections --> usePinnedAndFilteredEventsSections

### `/packages/stateful/hooks` 

### `/packages/stateful/server/makeGetEventStaticProps`
- makeGetDaoStaticProps --> makeGetEventStaticProps
