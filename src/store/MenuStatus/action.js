export const MENU_OPEN = 'MENU_OPEN'
export const MENU_CLOSE = 'MENU_CLOSE'

export function menuOpen () {
  return {
    type: MENU_OPEN
  }
}
export function menuClose () {
  return {
    type: MENU_CLOSE
  }
}
