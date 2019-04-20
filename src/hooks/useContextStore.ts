import { createContext, useContext } from 'react'
import { IReducers } from './useStore'
import { IAction } from '../actions'

// A store is simple some state with a couple of reducers
interface Store<State, Reducers> {
  state: State
  reducers: Reducers
}

// Our stores are stored in an object mapping id to the store
interface Stores {
  [id: string]: Store<any, any>
}

export const StoresContext = createContext<Stores>({})
export function useContextStore<
State,
Actions extends IAction,
Reducers extends IReducers<State, Actions>
> (id: string, initialValue: State, reducers: Reducers): Store<State, Reducers> {
  const stores = useContext(StoresContext)
  if (id in stores) {
    return stores[id]
  }
  const newStore = { state: initialValue, reducers }
  stores[id] = newStore
  return stores[id]
}
