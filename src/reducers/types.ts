export type IUserAlbumsCount = number;

export interface IAuthentication {
  userIsLoggedIn: boolean;
}

export type IUserAlbums = SpotifyApi.SavedAlbumObject[];

export interface IUsersFavorites {
  artists: SpotifyApi.ArtistObjectFull[];
  tracks: SpotifyApi.TrackObjectFull[];
}

export type IAlbumsMarkedForDeletion = string[];

export interface ILoadingState {
  isFetchingData: boolean;
}
