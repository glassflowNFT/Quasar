import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { EventCoreSelectors } from '@dao-dao/state'
import { WrenchEmoji } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import {
  ManageStorageItemsData,
  ManageStorageItemsComponent as StatelessManageStorageItemsComponent,
} from '../components/ManageStorageItems'
import { useActionOptions } from '../react'

const useDefaults: UseDefaults<ManageStorageItemsData> = () => ({
    setting: true,
    key: '',
    value: '',
  })

  const Component: ActionComponent<undefined, ManageStorageItemsData> = (
    props
  ) => {
    const { address, chainId } = useActionOptions()
  
    const existingItems = useRecoilValue(
        EventCoreSelectors.listAllItemsSelector({
        contractAddress: address,
        chainId,
      })
    )
  
    return (
      <StatelessManageStorageItemsComponent
        {...props}
        options={{
          existingItems,
        }}
      />
    )
  }