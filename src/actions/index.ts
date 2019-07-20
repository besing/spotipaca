import { setAuthTokenForRequests, spotifyApi } from '../utils/authentication';

export const ACTIONS = {
  SET_LOGGED_IN_STATE: 'SET_LOGGED_IN_STATE',
  SAVE_ALBUMS_TO_STATE: 'SAVE_ALBUMS_TO_STATE',
  SET_LOADING_STATE: 'SET_LOADING_STATE'
};

const setLoggedInState = (loggedInState: boolean) => ({
  type: ACTIONS.SET_LOGGED_IN_STATE,
  loggedInState
});

const saveAlbumsToState = albumsResponse => ({
  type: ACTIONS.SAVE_ALBUMS_TO_STATE,
  albumsResponse
});


const setLoadingState = state => ({
  type: ACTIONS.SET_LOADING_STATE,
  state
});

export const markAlbumForDeletion = albumId => ({
  type: ACTIONS.MARK_ALBUM_FOR_DELETION,
  albumId
});

/**
 * Implicit Grant Auth tokens get invalidated after 3600ms
 *
 * Test call to check if we're (still) successfully authenticated
 */
export const checkAuthTokenValidity = () => dispatch => {
  setAuthTokenForRequests();
  spotifyApi.getMySavedAlbums({ limit: 1 }).then(
    res => dispatch(setLoggedInState(true)),
    err => {
      dispatch(setLoggedInState(false));
      console.error('no valid token ', err);
    }
  );
};


export const fetchAlbums = (limit: number, offset: number) => dispatch => {
  dispatch(setLoadingState(true));
  spotifyApi.getMySavedAlbums({ limit, offset }).then(
    res => {
      console.log('res:', res);
      dispatch(saveAlbumsToState(res));
      dispatch(setLoadingState(false));
    },
    err => {
      console.error(err);
      dispatch(setLoadingState(false));
    }
  );
};
