import { Reducer, useReducer, Dispatch } from 'react'
// import { useContextStore } from './useContextStore'
import { IModelAction, IModelActions, IModelActionWithType } from '../actions'

// Reducers are defined as follows, given a state A and an action map A
export type IReducers<S, A> = { [K in keyof A]: Reducer<S, IModelAction<A>> }

// TODO: Typing of this function is a bit iffy.
// There should probably be a better way other than any casts here.

/**
 * Use a reducer that provides typed action dispatchers.
 * @param reducers The reducers in the form of a key => reducer map.
 * @param initialState The initial state of the state
 */
function useActionReducer<S, A, R extends IReducers<S, IModelActions<A>>>(
  reducers: R,
  initialState: S
): [S, { [K in keyof R]: Dispatch<IModelActionWithType<A, R>> }] {
  // We construct a map of key to dispatcher based on the reducers
  type IDispatcherMap = { [K in keyof R]: Dispatch<IModelActionWithType<A, R>> }

  // First we create our store reducer
  const [state, dispatcher] = useReducer(
    (prevState: S, action: IModelActionWithType<A, R>): S => {
      const key = action.type
      return reducers[key](prevState, action)
    },
    initialState
  )

  let dispatchers: IDispatcherMap = <IDispatcherMap>{}
  for (const key in reducers) {
    const actionDispatcher: Dispatch<IModelActionWithType<A, R>> = (
      action: IModelAction<A>
    ) => dispatcher({ ...action, type: key })
    dispatchers[key] = actionDispatcher
  }

  return [state, dispatchers]
}

/**
 * Use store hook.
 * S: the store state
 * A: Action map ([action: string]: Object)
 * R: Actions, defined as a reducer (S, Pick<A, keyof A>) => S
 *
 * @param id Store id
 * @param initialState initial state
 * @param actions actions that can be applied onto the state
 */
export function useStore<S, A, R extends IReducers<S, IModelActions<A>>>(
  id: string,
  initialState: S,
  actions: R
): [S, Record<keyof R, Dispatch<IModelActionWithType<A, R>>>] {
  // const store = useContextStore<S, A, R>(id, initialState, actions)
  // store.reducers = attachLoggingToActions<State, Action, Reducers>(reducers)
  const [state, dispatchers] = useActionReducer(actions, initialState)
  return [state, dispatchers]
}
