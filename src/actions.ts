import { Reducer } from 'react'
import { IReducers } from './hooks/useStore'

export type Action = { key: string } | Object
const actions: Action[] = []

function addAction (action: Action) {
  actions.push(action)
  // dev tools?
  console.log(action)
}

function attachMiddlewareToReducers<State> (reducers: IReducers<State>) {
  let middleWareReducers: IReducers<State> = {}
  for (const key in actions) {
    if (reducers.hasOwnProperty(key)) {
      middleWareReducers[key] = (data, ...args) => {
        addAction({ key, ...args }) // log the action
        return reducers[key](data, args)
      }
    }
  }
  return middleWareReducers
}

export { addAction, attachMiddlewareToReducers }
