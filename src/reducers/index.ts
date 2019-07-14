import { combineReducers } from 'redux';
import { ACTIONS } from '../actions';

const userAlbums = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.SAVE_ALBUMS_TO_STATE: {
      return [...state, ...action.albumsResponse.items];
    }
    default:
      return state;
  }
};

const authentication = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGGED_IN_STATE: {
      return { state, userIsLoggedIn: action.loggedInState };
    }
    default:
      return state;
  }
};

export default combineReducers({ authentication, userAlbums });