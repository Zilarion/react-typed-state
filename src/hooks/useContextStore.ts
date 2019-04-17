import { createContext, useContext } from 'react'
import { IReducers } from './useStore'

// A store is simple some state with a couple of reducers
interface Store<State> {
  state: State
  reducers: IReducers<State>
}

// Our stores are stored in an object mapping id to the store
interface Stores {
  [id: string]: Store<any>
}

export const StoresContext = createContext<Stores>({})
export function useContextStore<State> (
  id: string,
  initialValue: State,
  reducers: IReducers<State>
) {
  const stores = useContext(StoresContext)
  if (id in stores) {
    return stores[id]
  }
  const newStore = { state: initialValue, reducers }
  stores[id] = newStore
  return stores[id]
}
