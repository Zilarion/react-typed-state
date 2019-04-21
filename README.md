# useStore

An opininated library for immutable yet simple state management using react hooks and typescript.

## Roadmap

Currently, this library is in development. Contributions are welcome.

The following steps have to be completed before a first version is available:

- [ ] Properly functioning typing
- [ ] Add extensive testing
- [ ] Performance verification and possible improvements (context may be really slow)
- [ ] Consider whether we want/can improve upon non-immutability to enable direct state mutations.

## Rationale

When looking at the most prominent state libraries available, I was glad there were such amazing solutions for my problems. However, I found they add too much boilerplate, lack features that immutable trees provide (MobX).

I was incredibly glad to come across MobX state tree, as this seemed like an ideal solution, offering the best of both works. However, I found having to work with a different type system other than plain typescript was a big downside.

As hooks where introduced, I wondered, if it would not be possible to use reducers and context to provide a state management library that would offer the best features of immutable trees through a very simple interface.

## API

The intended API is quite simple, one would create their own custom hook, defining a store:

```typescript
import { useStore } from "use-store";

interface Todo {
  name: string;
  completed: boolean;
}

type TodoStore = Todo[];

function useTodoStore() {
  return useStore<TodoStore>('todos', [], {
      add: (prevState: TodoStore, data: Todo, type: 'add') {
        return [...prevState, data]
      },
      complete: (prevState: TodoStore, data: { index: number }, type: 'complete') {
        const oldTodo = prevState[data.index];
        return [...prevState, [index]: { ...oldTodo, completed: true }]
      }
  });
}
```

Now one can use this hook in any component they like, fully statically typed:

```jsx
function TodoList() {
  const [todos, dispatchers] = useTodoStore();
  return (
    <div>
      {todos.map((todo, i) => (
        <div onClick={() => dispatchers.complete(i)}>
          {todo.name} ({todo.completed})
        </div>
      ))}
    </div>
  );
}
```

However, to share this state across all components, one has to provide the context to access all of these stores once:

```jsx
import { StoresContext } from "use-store";

function App() {
  return (
    <StoresContext.Provider value={{}}>
      <YourApplication />
    </StoresContext.Provider>
  );
}
```
