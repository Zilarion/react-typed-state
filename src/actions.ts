// import { IReducers } from './hooks/useStore'

/*
 * Generically, the actions of a model is defined as map of a key (the name of the function)
 * and a generic property A that is a map between these keys to its action properties T[K].
 */
export type IModelActions<A> = { [K in keyof A]: A[K] }

// A single action must be one of the models actions provided.
export type IModelAction<A> = Pick<A, keyof A>
export type IModelActionWithType<A, R> = IModelAction<A> & { type: keyof R }

// TODO: Can we properly type the history?
// const history: IModelAction<any>[] = []
// function logAction<A> (action: IModelAction<A>) {
//   history.push(action)
//   // dev tools?
//   console.log(action)
// }

// type IModelActionReducer<S, A> = (prevState: S, action: IModelAction<A>) => S

// export function attachMiddlewareToReducers<
//   S,
//   A,
//   R extends IReducers<S, IModelActions<A>>
// >(reducers: R, mw: IModelActionReducer<S, A>): R {
//   let result: R = <R>{}

//   Object.keys(reducers).forEach(key => {
//     const reducer: IModelActionReducer<S, A> = reducers[key]
//     const newReducer: IModelActionReducer<S, A> = (prevState, action) => {
//       mw(prevState, action)
//       return reducer(prevState, action)
//     }
//     result[key] = newReducer
//   })
//   return result
// }

// export function attachLoggingToActions<
//   S,
//   A,
//   R extends IReducers<S, IModelActions<A>>
// >(reducers: R) {
//   return attachMiddlewareToReducers<S, A, R>(reducers, (prevState, action) => {
//     logAction(action)
//     return prevState
//   })
// }
