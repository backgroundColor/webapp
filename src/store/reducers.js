// @flow
import { combineReducers } from 'redux'
import type { Store } from 'redux'
import locationReducer from './location'
import { storeHelper } from './createStore'
import { cityMess } from './CityMess/reducers'
import { menuStatus } from './MenuStatus/reducer'
type AsyncReducers = { [key: string]: any }
type AsyncReducer = { key: string, reducer: any }
export type Action = { type: string, payload?: any }

export const makeRootReducer = (asyncReducers: AsyncReducers = {}) => {
  return combineReducers({
    location: locationReducer,
    cityMess,
    menuStatus,
    ...asyncReducers
  })
}

export const injectReducer = (store: Store<*, *>, { key, reducer }: AsyncReducer) => {
  storeHelper.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(storeHelper.asyncReducers))
}

export default makeRootReducer
