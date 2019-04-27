/*
 * Helper types
 */
type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never
type ReplaceReturnType<TPrevious, TNewReturn> = (
  ...args: ArgumentTypes<TPrevious>
) => TNewReturn

type IActions<State> = {
  [key: string]: (...args: any[]) => State // | Promise<(t: T) => T>
}

type Stripped<Actions> = {
  [P in keyof Actions]: ReplaceReturnType<Actions[P], void>
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
 *
 * A is an action->data map
 *
 * @param stateProvider provides state, i.e. useState()
 * @param actions actions that can be applied onto the state
 */
export function useActions<State, Actions extends IActions<State>> (
  initial: State,
  actions: (t: State) => Actions,
  stateProvider: IStateProvider<State>
): [State, Stripped<Actions>] {
  let [state, setState] = stateProvider(initial)
  let a = actions(state)

  // all keys will be assigned in for loop below
  let r: Stripped<Actions> = {} as Stripped<Actions>
  for (let key in a) {
    r[key] = function (...rest: any[]) {
      setState(a[key](...rest))
    }
  }
  return [state, r]
}
