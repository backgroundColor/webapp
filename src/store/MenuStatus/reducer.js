import { MENU_OPEN, MENU_CLOSE } from './action'

export function menuStatus (state = {
  menustatus: 'open'
}, action) {
  switch (action.type) {
    case MENU_OPEN:
      return Object.assign({}, state, {
        menustatus: 'open'
      })
    case MENU_CLOSE:
      return Object.assign({}, state, {
        menustatus: 'close'
      })
    default:
      return state
  }
}
