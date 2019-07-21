import { ACTIONS, ICombinedActionsInterface } from './types';

export const setLoggedInState = (
  loggedInState: boolean
): ICombinedActionsInterface => ({
  type: ACTIONS.SET_LOGGED_IN_STATE,
  loggedInState
});

export const saveAlbumsToState = (
  albumsResponse: SpotifyApi.UsersSavedAlbumsResponse
): ICombinedActionsInterface => ({
  type: ACTIONS.SAVE_ALBUMS_TO_STATE,
  albumsResponse
});

export const saveUsersFavoriteArtists = (
  artistsResponse: SpotifyApi.UsersTopArtistsResponse
): ICombinedActionsInterface => ({
  type: ACTIONS.SAVE_USERS_FAVORITE_ARTISTS,
  artistsResponse
});

export const saveUsersFavoriteTracks = (
  tracksResponse: SpotifyApi.UsersTopTracksResponse
): ICombinedActionsInterface => ({
  type: ACTIONS.SAVE_USERS_FAVORITE_TRACKS,
  tracksResponse
});

export const setLoadingState = (state: boolean): ICombinedActionsInterface => ({
  type: ACTIONS.SET_LOADING_STATE,
  state
});

export const markAlbumForDeletion = (
  albumId: string
): ICombinedActionsInterface => ({
  type: ACTIONS.MARK_ALBUM_FOR_DELETION,
  albumId
});

export const removeAlbumsFromUi = (
  albumIds: string[]
): ICombinedActionsInterface => ({
  type: ACTIONS.REMOVE_ALBUMS_FROM_UI,
  albumIds
});
