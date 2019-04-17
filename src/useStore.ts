import { useState, useContext, createContext } from 'react'
import { addAction, Reducers } from './actions'

interface Stores {
  [id: string]: Object
}
const StoresContext = createContext<Stores>({})

function getStore (id: string, initialValue: any) {
  const stores = useContext(StoresContext)
  if (id in stores) {
    return stores[id]
  }
  const newStore = initialValue
  stores[id] = newStore
  return stores[id]
}

// Use store hook
function useStore<Data> (
  id: string,
  initialValue: Data,
  actions: Reducers<Data>
): [Data, Reducers<Data>] {
  let stores = getStore(id, initialValue)

  const [data, setData] = useState(initialValue)

  // Right now this exports the actual data reference, can we somehow prevent that?
  // We could do a copy, but that may be expensive, perhaps just tell people not to :/
  return [data, actions]
}

export { useStore, StoresContext }
