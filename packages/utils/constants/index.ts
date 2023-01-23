import { ChainPrefixIdMaps } from './chainPrefixIdMaps'
import { CodeIdConfigs } from './codeIdConfigs'



// True if on mainnet, false if on testnet.
export const MAINNET = process.env.NEXT_PUBLIC_MAINNET === 'true'

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as string
export const CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME as string 
export const CHAIN_TXN_URL_PREFIX = process.env
  .NEXT_PUBLIC_CHAIN_TXN_URL_PREFIX as string
  export const CHAIN_RPC_ENDPOINT = process.env
  .NEXT_PUBLIC_CHAIN_RPC_ENDPOINT as string
  export const CHAIN_REST_ENDPOINT = process.env
  .NEXT_PUBLIC_CHAIN_REST_ENDPOINT as string
export const CHAIN_BECH32_PREFIX = process.env
  .NEXT_PUBLIC_CHAIN_BECH32_PREFIX as string

export const MICRO_STAKING_DENOM = process.env
  .NEXT_PUBLIC_STAKING_DENOM as string

// Code IDs
if (!(CHAIN_ID in CodeIdConfigs)) {
    console.error(`Chain ID '${CHAIN_ID}' not found in Code ID Configs`)
  }
export const CODE_ID_CONFIG = CodeIdConfigs[CHAIN_ID]!

// Chain Prefix -> ID Map for determining chain from Event core address.
export const CHAIN_PREFIX_ID_MAP =
  ChainPrefixIdMaps[MAINNET ? 'mainnet' : 'testnet']

  export const V1_EVENT_FACTORY_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_V1_EVENT_FACTORY_CONTRACT_ADDRESS as string

// Event name min/max and description max defined in core.

// Indexer

// Search

// Stargaze
export const STARGAZE_RPC_ENDPOINT = process.env
  .NEXT_PUBLIC_STARGAZE_RPC_ENDPOINT as string
export const STARGAZE_REST_ENDPOINT = process.env
  .NEXT_PUBLIC_STARGAZE_REST_ENDPOINT as string
export const STARGAZE_PROFILE_API_TEMPLATE = process.env
  .NEXT_PUBLIC_STARGAZE_PROFILE_API_TEMPLATE as string
export const STARGAZE_URL_BASE = process.env
  .NEXT_PUBLIC_STARGAZE_URL_BASE as string

// Token Decimals 