import { ContractVersionInfo } from './contracts'
import {
  Config,
  DumpStateResponse,
  EntryCreationModuleWithInfo,
} from './contracts/EventCore'

export interface IndexerDumpState
  extends Omit<DumpStateResponse, 'entry_creation_modules'> {
  entry_creation_modules: EntryCreationModuleWithInfo[]
  judgingModuleInfo: ContractVersionInfo
  createdAt: string // UTC string
  adminInfo?: {
    admin?: string
    config: Config
    info?: ContractVersionInfo
  } | null
  entryCount?: number
}
