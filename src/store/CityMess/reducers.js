import { GET_CITY_DATA } from './action'

export function cityMess (state = {}, action) {
  return action.type === GET_CITY_DATA
    ? Object.assign({}, state, {
      citymess: action.value
    })
    : state
}
