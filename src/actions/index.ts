import { setAuthTokenForRequests, spotifyApi } from '../utils/authentication';

export const ACTIONS = {
  SET_LOGGED_IN_STATE: 'SET_LOGGED_IN_STATE',
  SAVE_ALBUMS_TO_STATE: 'SAVE_ALBUMS_TO_STATE',
  MARK_ALBUM_FOR_DELETION: 'MARK_ALBUM_FOR_DELETION',
  SAVE_USERS_FAVORITE_ARTISTS: 'SAVE_USERS_FAVORITE_ARTISTS',
  SAVE_USERS_FAVORITE_TRACKS: 'SAVE_USERS_FAVORITE_TRACKS',
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

const saveUsersFavoriteArtists = artistsResponse => ({
  type: ACTIONS.SAVE_USERS_FAVORITE_ARTISTS,
  artistsResponse
});

const saveUsersFavoriteTracks = tracksResponse => ({
  type: ACTIONS.SAVE_USERS_FAVORITE_TRACKS,
  tracksResponse
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

const fetchUsersFavoriteArtists = () => dispatch => {
  spotifyApi.getMyTopArtists({ limit: 50, time_range: 'medium_term' }).then(
    res => {
      dispatch(saveUsersFavoriteArtists(res));
    },
    err => {
      console.error(err);
    }
  );
};

const fetchUsersFavoriteTracks = () => dispatch => {
  spotifyApi.getMyTopTracks({ limit: 50, time_range: 'medium_term' }).then(
    res => {
      dispatch(saveUsersFavoriteTracks(res));
    },
    err => {
      console.error(err);
    }
  );
};

export const fetchUsersFavorites = () => dispatch => {
  dispatch(fetchUsersFavoriteArtists());
  dispatch(fetchUsersFavoriteTracks());
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
