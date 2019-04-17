import { useStore } from '../..'
import { IReducers } from '../../useStore'

interface Todo {
  name: string
  completed: boolean
}
type Todos = Todo[]

export function useTodoList (): [Todos, IReducers<Todos>] {
  const [data, actions] = useStore<Todos>('todos', [], {
    toggleComplete: (data: Todos, name: string) => {
      return data.map(data =>
        data.name != name ? data : { ...data, completed: !data.completed }
      )
    }
  })
  return [data, actions]
}
