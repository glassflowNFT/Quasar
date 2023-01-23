# @quasar-voting/stateful

This package combines the `@quasar-voting/stateless` and `@quasar-voting/state` packages
into stateful components, hooks, and other systems. These are the live,
intelligent components that do fun stuff with data.

## Layout

| Location                                               | Summary                                                                                                                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`actions`](./actions)                                 | UI components that allow for the creation and viewing of Cosmos messages in a proposal.                                                                                                         |
| [`command`](./command)                                 | Interface that allows customizing command modal actions and contexts.                                                                                                                           |
| [`components`](./components)                           | Stateful React components that combine elements from the [`state` package](../state) and [`stateless` package](../stateless).                                                                   |
| [`hooks`](./hooks)                                     | Stateful React hooks that combine elements from the [`state` package](../state) and [`stateless` package](../stateless). Notably, contains hooks for interacting with on-chain smart contracts. |
| [`recoil`](./recoil)                                   | [Recoil](https://recoiljs.org) atoms and selectors that require [`state`](../state) or other stateful information.                                                                              |
| [`server`](./server)                                   | Isolated functions only to be run on the server. Notably, contains main [Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) code.                   |
| [`utils`](./utils)                                     | Stateful utility functions.                                                                                                                                                                     |
