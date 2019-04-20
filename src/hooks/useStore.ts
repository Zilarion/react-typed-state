import { Reducer } from 'react'
import { useContextStore } from './useContextStore'
import { IAction, attachLoggingToActions } from '../actions'

export interface IReducers<State, Action extends IAction> {
  [name: string]: Reducer<State, Action>
}

// Use store hook
export function useStore<
State,
Actions extends IAction,
Reducers extends IReducers<State, Actions>
> (id: string, initialValue: State, reducers: Reducers): [State, Reducers] {
  const store = useContextStore<State, Actions, Reducers>(
    id,
    initialValue,
    reducers
  )

  store.reducers = attachLoggingToActions<State, Actions, Reducers>(reducers)

  // Right now this exports the actual data reference, can we somehow prevent that?
  // We could do a copy, but that may be expensive, perhaps just tell people not to :/
  return [store.state, store.reducers]
}
