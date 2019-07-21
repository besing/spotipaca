export enum ACTIONS {
  SET_LOGGED_IN_STATE = 'SET_LOGGED_IN_STATE',
  SAVE_ALBUMS_TO_STATE = 'SAVE_ALBUMS_TO_STATE',
  MARK_ALBUM_FOR_DELETION = 'MARK_ALBUM_FOR_DELETION',
  SAVE_USERS_FAVORITE_ARTISTS = 'SAVE_USERS_FAVORITE_ARTISTS',
  SAVE_USERS_FAVORITE_TRACKS = 'SAVE_USERS_FAVORITE_TRACKS',
  SET_LOADING_STATE = 'SET_LOADING_STATE',
  REMOVE_ALBUMS_FROM_UI = 'REMOVE_ALBUMS_FROM_UI'
}

interface ISetLoggedInState {
  type: typeof ACTIONS.SET_LOGGED_IN_STATE;
  loggedInState: boolean;
}

interface ISaveAlbumsToState {
  type: ACTIONS.SAVE_ALBUMS_TO_STATE;
  albumsResponse: SpotifyApi.UsersSavedAlbumsResponse;
}

interface ISaveUsersFavoriteArtists {
  type: typeof ACTIONS.SAVE_USERS_FAVORITE_ARTISTS;
  artistsResponse: SpotifyApi.UsersTopArtistsResponse;
}

interface ISaveUsersFavoriteTracks {
  type: typeof ACTIONS.SAVE_USERS_FAVORITE_TRACKS;
  tracksResponse: SpotifyApi.UsersTopTracksResponse;
}

interface ISetLoadingState {
  type: typeof ACTIONS.SET_LOADING_STATE;
  state: boolean;
}

interface IMarkAlbumForDeletion {
  type: typeof ACTIONS.MARK_ALBUM_FOR_DELETION;
  albumId: string;
}

interface IRemoveAlbumsFromUi {
  type: typeof ACTIONS.REMOVE_ALBUMS_FROM_UI;
  albumIds: string[];
}

export type ICombinedActionsInterface =
  | ISetLoggedInState
  | ISaveAlbumsToState
  | ISaveUsersFavoriteArtists
  | ISaveUsersFavoriteTracks
  | ISetLoadingState
  | IMarkAlbumForDeletion
  | IRemoveAlbumsFromUi;
