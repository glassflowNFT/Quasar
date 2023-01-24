import { ContractVersionInfo, Uint128 } from './common'

export type ExecuteMsg = {}


export interface InstantiateMsg {
    cw4_group_code_id: number
    initial_members: Member[]
    [k: string]: unknown
}

export interface Member {
    addr: string
    weight: number
    [k: string]: unknown
}

export type QueryMsg = {}

export interface MigrateMsg {
    [k: string]: unknown
}