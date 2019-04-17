export type Action = { key: string } | Object
export type Reducers<Data> = {
  [key: string]: (data: Data, ...others: any[]) => Data
}

const actions: Action[] = []

function addAction (action: Action) {
  actions.push(action)
  // dev tools?
  console.log(action)
}

function attachMiddlewareToReducers<Data> (reducers: Reducers<Data>) {
  for (const key in actions) {
    if (reducers.hasOwnProperty(key)) {
      reducers[key] = (data, ...args) => {
        addAction({ key, ...args }) // log the action
        return reducers[key](data, args)
      }
    }
  }
}

export { addAction, attachMiddlewareToReducers }
