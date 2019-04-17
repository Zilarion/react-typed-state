import { useStore } from '../..'

interface Todo {
  name: string
  completed: boolean
}
type Todos = Todo[]

export function useTodoList (): [Todos, any] {
  const [data, actions] = useStore<Todos>('todos', [], {
    toggleComplete: (data: Todos, name: string) => {
      return data.map(data =>
        data.name != name ? data : { ...data, completed: !data.completed }
      )
    }
  })
  return [data, actions]
}