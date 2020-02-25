import { combineReducers } from 'redux';
import {
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
  SAVE_ITEMS,
  OPEN_MODAL,
  CLOSE_MODAL
} from './actions.js';

const initialState = {
  loggedIn: false,
  username: null,
  jstoken: null
};

const itemsInitialSate = {
  items: []
};


function admins(state=initialState, action) {
  switch (action.type) {
  case LOGIN_ADMIN:
    localStorage.setItem('token', (action.data.token));
    return {...state,
            jstoken: action.data.token,
            loggedIn: true
           };
  case LOGOUT_ADMIN:
    console.log("logging out");
    localStorage.setItem('token', null);
    return {...state,
            jstoken: null,
            loggedIn: false
           };
  case OPEN_MODAL:
    return {...state,
            modalOpen: true
           };
  case CLOSE_MODAL:
    return {...state,
            modalOpen: false
           };
  default:
    return state;
  }
}

function items(state=itemsInitialSate, action) {
  switch(action.type) {
  case SAVE_ITEMS:
    return{...state,
           items: action.data
          };
  default:
    return state;
  }
}

const eCommerceApp = combineReducers({
  admins, items
});
export default eCommerceApp;
