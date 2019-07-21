import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  setLoggedInState,
  saveUsersFavoriteArtists,
  saveUsersFavoriteTracks,
  setLoadingState,
  saveAlbumsToState,
  removeAlbumsFromUi
} from './index';
import { setAuthTokenForRequests, spotifyApi } from '../utils/authentication';
import { AppState } from '../reducers';

type IDefaultThunkAction = ThunkAction<void, AppState, null, Action>;

/**
 * Implicit Grant Auth tokens get invalidated after 3600ms
 *
 * Test call to check if we're (still) successfully authenticated
 */
export const checkAuthTokenValidity = (): IDefaultThunkAction => dispatch => {
  setAuthTokenForRequests();
  spotifyApi.getMySavedAlbums({ limit: 1 }).then(
    res => dispatch(setLoggedInState(true)),
    err => {
      dispatch(setLoggedInState(false));
      console.error('no valid token ', err);
    }
  );
};

const fetchUsersFavoriteArtists = (): IDefaultThunkAction => dispatch => {
  spotifyApi.getMyTopArtists({ limit: 50, time_range: 'medium_term' }).then(
    res => {
      dispatch(saveUsersFavoriteArtists(res));
    },
    err => {
      console.error(err);
    }
  );
};

const fetchUsersFavoriteTracks = (): IDefaultThunkAction => dispatch => {
  spotifyApi.getMyTopTracks({ limit: 50, time_range: 'medium_term' }).then(
    res => {
      dispatch(saveUsersFavoriteTracks(res));
    },
    err => {
      console.error(err);
    }
  );
};

export const fetchUsersFavorites = (): IDefaultThunkAction => dispatch => {
  dispatch(fetchUsersFavoriteArtists());
  dispatch(fetchUsersFavoriteTracks());
};

export const fetchAlbums = (
  limit: number,
  offset: number
): IDefaultThunkAction => dispatch => {
  dispatch(setLoadingState(true));
  spotifyApi.getMySavedAlbums({ limit, offset }).then(
    res => {
      dispatch(saveAlbumsToState(res));
      dispatch(setLoadingState(false));
    },
    err => {
      console.error(err);
      dispatch(setLoadingState(false));
    }
  );
};

export const deleteAlbums = (
  albumIds: string[]
): IDefaultThunkAction => dispatch => {
  spotifyApi.removeFromMySavedAlbums(albumIds).then(
    res => {
      dispatch(removeAlbumsFromUi(albumIds));
    },
    err => console.error(err)
  );
};
