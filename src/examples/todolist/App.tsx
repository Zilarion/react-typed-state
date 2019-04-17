import * as React from 'react'
import { StoresContext } from '../../index'
import TodoList from './TodoList'

function App () {
  return (
    <StoresContext.Provider value={{}}>
      <TodoList />
    </StoresContext.Provider>
  )
}
