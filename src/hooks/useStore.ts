import { Reducer } from 'react'
import { useContextStore } from './useContextStore'
import { attachMiddlewareToReducers } from '../actions'

export interface IReducers<State> {
  [name: string]: Reducer<State, any>
}

// Use store hook
export function useStore<State> (
  id: string,
  initialValue: State,
  reducers: IReducers<State>
): [State, IReducers<State>] {
  const store = useContextStore(id, initialValue, reducers)

  attachMiddlewareToReducers<State>(reducers)

  // Right now this exports the actual data reference, can we somehow prevent that?
  // We could do a copy, but that may be expensive, perhaps just tell people not to :/
  return [store.state, store.reducers]
}
