# useStore

An opininated library for immutable yet simple state management typescript.

## Roadmap

Currently, this library is in development. Contributions are welcome.

The following steps have to be completed before a first version is available:

- [x] Properly functioning typing
- [x] Consider whether we want/can improve upon non-immutability to enable direct state mutations.
- [ ] Add testing
- [ ] How do we deal with async actions?
- [ ] How do we handle a

## Rationale

When looking at the most prominent state libraries available, I was glad there were such amazing solutions for my problems. However, I found they add too much boilerplate, lack features that immutable trees provide (MobX).

I was incredibly glad to come across MobX state tree, as this seemed like an ideal solution, offering the best of both works. However, I found having to work with a different type system other than plain typescript was a big downside.

As hooks where introduced, I wondered, if it would not be possible to use reducers and context to provide a state management library that would offer the best features of immutable trees through a very simple interface. As a result the useActions hook was created.

## API

The intended API is quite simple, one would create their own custom hook, defining a store:

```typescript
import { useActions } from 'use-store'
import { useState } from 'react'

interface Todo {
  name: string
  completed: boolean
}

type TodoStore = Todo[]

function useTodoStore () {
  return useActions(
    [],
    (todos: TodoStore) => ({
      add: (newTodo: Todo) => {
        todos.push(newTodo)
      },
      complete: (index: number) => {
        todos[index].completed = true
      }
    }),
    useState
  )
}

```

Now one can use this hook in any component they like, fully statically typed:

```jsx
function TodoList() {
  const [todos, { complete }] = useTodoStore();
  return (
    <div>
      {todos.map((todo, i) => (
        <div onClick={() => complete(i)}>
          {todo.name} ({todo.completed})
        </div>
      ))}
    </div>
  );
}
```
