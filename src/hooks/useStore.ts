import { Reducer, useReducer, Dispatch } from 'react'
import { useContextStore } from './useContextStore'
import { IAction } from '../actions'

export interface IReducers<State, Actions extends IAction> {
  [name: string]: Reducer<State, Actions>
}

// TODO: Typing of this function is a bit iffy. There should probably be a better way other than any casts here.
function reducersToDispatchers<
  State,
  Action extends IAction,
  Reducers extends IReducers<State, Action>
>(reducers: Reducers): { [P in keyof Reducers]: Dispatch<Action> } {
  let result: any = {}
  Object.keys(reducers).map(key => {
    const reducer = reducers[key]
    const [, dispatch] = useReducer(reducer, <any>{})
    result[key] = dispatch
  })
  return <{ [P in keyof Reducers]: Dispatch<Action> }>result
}

// Use store hook
export function useStore<
  State,
  Action extends IAction,
  Reducers extends IReducers<State, Action>
>(
  id: string,
  initialState: State,
  reducers: Reducers
): [State, Record<keyof Reducers, Dispatch<Action>>] {
  const store = useContextStore<State, Action, Reducers>(
    id,
    initialState,
    reducers
  )
  // store.reducers = attachLoggingToActions<State, Action, Reducers>(reducers)

  // Because we do not allow the reducers to change, we can safely assume these reducers are always called in the correct order.
  const dispatchers: Record<
    keyof Reducers,
    Dispatch<Action>
  > = reducersToDispatchers<State, Action, Reducers>(reducers)

  return [store.state, dispatchers]
}
