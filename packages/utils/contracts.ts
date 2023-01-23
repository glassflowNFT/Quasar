import { ContractVersion } from '@quasar-vote/types'

const CONTRACT_VERSIONS = Object.values(ContractVersion) 

// If version is defined, returns it. Otherwise, returns `undefined`.
// Essentially just filters version by its presence in the `ContractVersion`
// enum.
export const parseContractVersion = (
    version: string
  ): ContractVersion | undefined => CONTRACT_VERSIONS.find((v) => v === version)

