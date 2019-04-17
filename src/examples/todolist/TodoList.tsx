import * as React from 'react'
import { useTodoList } from './TodoStore'

export default function TodoList () {
  const [todos, actions] = useTodoList()

  return (
    <div>
      {' '}
      {todos.map(({ name, completed }) => (
        <div key={name} onClick={e => actions.toggleComplete}>
          {name} is {completed && ' not '} done.
        </div>
      ))}
    </div>
  )
}
