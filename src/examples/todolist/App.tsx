import * as React from 'react'
import { StoresContext } from '../../useStore'
import TodoList from './TodoList'

function App () {
  return (
    <StoresContext.Provider value={{}}>
      <TodoList />
    </StoresContext.Provider>
  )
}
