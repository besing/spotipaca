import { setAuthTokenForRequests, spotifyApi } from '../utils/authentication';

export const ACTIONS = {
  SET_LOGGED_IN_STATE: 'SET_LOGGED_IN_STATE',
  SAVE_ALBUMS_TO_STATE: 'SAVE_ALBUMS_TO_STATE'
};

const setLoggedInState = (loggedInState: boolean) => ({
  type: ACTIONS.SET_LOGGED_IN_STATE,
  loggedInState
});

const saveAlbumsToState = albumsResponse => ({
  type: ACTIONS.SAVE_ALBUMS_TO_STATE,
  albumsResponse
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

export const fetchAlbums = () => dispatch =>
  spotifyApi.getMySavedAlbums({ limit: 2 }).then(
    res => dispatch(saveAlbumsToState(res)),
    err => {
      console.error(err);
    }
  );