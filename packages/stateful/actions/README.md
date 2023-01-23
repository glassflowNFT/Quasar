# @quasar-vote/stateful/actions

Actions are UI components that allow easy creation or viewing of Cosmos messages
in a transaction. They are useful for creating proposals in DAOs that cause
on-chain events, such as smart contract executions and bank module transfers.

## React Setup

### **1. Wrap the app**

Add the `ActionsProvider` to your app, likely at a high enough level to
encompass entire pages. You will need to pass some options, like the contract
address and version of the DAO's core contract.

```tsx
import { ActionsProvider } from '@quasar-vote/stateful/actions'
import { ActionOptionsContextType } from '@quasar-vote/types'

const App = () => (
  <ActionsProvider
    options={{
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      address: 'daoCoreAddressGoesHere',
      context: {
        type: ActionOptionsContextType.Dao,
        coreVersion: '0.2.0',
      },
    }}
  >
    {children}
  </ActionsProvider>
)
```

### **2. Use the hooks**

Now that the library has been setup, you can use the hook anywhere as a
descendant of the Provider to access the actions.

```tsx
import { useCoreActions } from '@quasar-vote/stateful/actions'

const ActionPicker = () => {
  const actions = useCoreActions()

  return actions.map((action) => (
    <ActionPickerOption action={action} key={action.key} />
  ))
}
```