import produce from 'immer'

type IActions = {
  [key: string]: (...args: any[]) => void
}

type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never
type Dispatchers<Actions> = {
  [P in keyof Actions]: (args: ArgumentTypes<Actions[P]>) => void
}

// A state updater can work on the current state directly, or using a callback (for async operations)
type IStateUpdater<State> =
  | ((newState: State) => void)
  | (() => (newState: State) => void)

// A state provider gives the current state and a way to update it, i.e. an useState() hook
type IStateProvider<State> = (initial: State) => [State, IStateUpdater<State>]

/**
 * Use actions transforms a map of actions of immutable actions
 * into utility functions that provide an easy way of dispatching actions without boilerplate.
 * @param initial Initial state
 * @param actions actions that can be applied onto the state
 * @param stateProvider provides state. Usually an useState() hook
 */
export function useActions<State, Actions extends IActions> (
  initial: State,
  actions: (currentState: State) => Actions,
  stateProvider: IStateProvider<State>
): [State, Dispatchers<Actions>] {
  let [state, setState]: [State, IStateUpdater<State>] = stateProvider(initial)
  let actionFunctions = actions(state)

  // all keys will be assigned in for loop below
  let dispatchers: Dispatchers<Actions> = {} as Dispatchers<Actions>
  for (let key in actions) {
    const action = actionFunctions[key]
    // Wrap each action with an immer produce function, such that we update the state correctly.
    dispatchers[key] = function (...rest: any[]) {
      const nextState = produce(state, (draft: State) => {
        action(draft, rest)
      })
      setState(nextState)
    }
  }
  return [state, dispatchers]
}
