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
    case ACTIONS.REMOVE_ALBUMS_FROM_UI: {
      return state.filter(album => !action.albumIds.includes(album.album.id));
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

const usersFavorites = (state = { artists: [], tracks: [] }, action) => {
  switch (action.type) {
    case ACTIONS.SAVE_USERS_FAVORITE_ARTISTS: {
      return { ...state, artists: [...action.artistsResponse.items] };
    }
    case ACTIONS.SAVE_USERS_FAVORITE_TRACKS: {
      return { ...state, tracks: [...action.tracksResponse.items] };
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
  usersFavorites,
  albumsMarkedForDeletion,
  loadingState
});
