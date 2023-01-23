import { CodeIdConfig } from '@quasar-voting/types'

const terpTestnet: CodeIdConfig = {}

const terpMainnet: CodeIdConfig = {}

export const CodeIdConfigs: Record<string, CodeIdConfig | undefined> = {
    'athena-3': terpTestnet,
    'morocco-1': terpMainnet,
  }