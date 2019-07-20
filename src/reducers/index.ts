import { combineReducers } from 'redux';
import { ACTIONS } from '../actions';

const userAlbumsCount = (state = 0, action) => {
  switch (action.type) {
    case ACTIONS.SAVE_ALBUMS_TO_STATE: {
      return action.albumsResponse.total;
    }
    default:
      return state;
  }
};

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
      return { userIsLoggedIn: action.loggedInState };
    }
    default:
      return state;
  }
};

    }
    default:
      return state;
  }
};

const albumsMarkedForDeletion = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.MARK_ALBUM_FOR_DELETION: {
      if (state.includes(action.albumId)) {
        return state.filter(album => album !== action.albumId);
      }
      return [...state, action.albumId];
    }
    default:
      return state;
  }
};

const loadingState = (state = { isFetchingData: false }, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING_STATE: {
      return { isFetchingData: action.state };
    }
    default:
      return state;
  }
};

export default combineReducers({
  authentication,
  userAlbumsCount,
  userAlbums,
  loadingState
});
