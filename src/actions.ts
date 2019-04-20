import { IReducers } from './hooks/useStore'

export type IAction = { type: string }

const history: IAction[] = []
function logAction(action: IAction) {
  history.push(action)
  // dev tools?
  console.log(action)
}

export function attachMiddlewareToReducers<
  State,
  Action extends IAction,
  Reducers extends IReducers<State, Action>
>(
  reducers: Reducers,
  mw: (prevState: State, action: Action) => void
): Reducers {
  let result: Reducers = <Reducers>{}

  Object.keys(reducers).forEach(key => {
    result[key] = (prevState, action) => {
      mw(prevState, action)
      return reducers[key](prevState, action)
    }
  })
  return result
}

export function attachLoggingToActions<
  State,
  Action extends IAction,
  Reducers extends IReducers<State, any>
>(reducers: Reducers) {
  return attachMiddlewareToReducers<State, Action, Reducers>(
    reducers,
    (prevState, action) => logAction(action)
  )
}
