/*
 * action types
 */
export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGOUT_ADMIN = 'LOGOUT_ADMIN';
export const SAVE_ITEMS = 'SAVE_ITEMS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
/*
 * other constants
 */

/*
 * action creators
 */
export function loginAdmin(data) {
  return { type: LOGIN_ADMIN, data };
}

export function logoutAdmin() {
  return { type: LOGOUT_ADMIN };
}

export function saveItems(data) {
  return { type: SAVE_ITEMS, data };
}

export function openModal(){
  return { type: OPEN_MODAL};
}

export function closeModal(){
  return { type: CLOSE_MODAL};
}
