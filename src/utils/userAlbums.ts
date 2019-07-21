export const sortUserAlbums = (
  userAlbums: SpotifyApi.SavedAlbumObject[],
  orderBy: 'added_at' | 'popularity',
  order: 'ascending' | 'descending'
) => {
  const sortedAlbums = userAlbums.slice().sort((a, b) => {
    if (orderBy === 'added_at') {
      const dateA = new Date(a['added_at']);
      const dateB = new Date(b['added_at']);

      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      if (dateA === dateB) {
        return 0;
      }
    }
    if (orderBy === 'popularity') {
      return b.album[orderBy] - a.album[orderBy];
    }
    return 0;
  });
  return order === 'ascending' ? sortedAlbums.reverse() : sortedAlbums;
};

export const filterUsersFavorites = (
  userAlbums: SpotifyApi.SavedAlbumObject[],
  usersFavoriteArtists: SpotifyApi.ArtistObjectFull[],
  usersFavoriteTracks: SpotifyApi.TrackObjectFull[],
  filterEnabled: boolean
): SpotifyApi.SavedAlbumObject[] => {
  if (!filterEnabled) return userAlbums;
  return userAlbums
    .filter(album => {
      const savedAlbumArtistId = album.album.artists[0].id;
      const artistIsAlsoFavorite = usersFavoriteArtists.some(
        artist => artist.id === savedAlbumArtistId
      );
      // only return albums which aren't inside the users "Favorite Artists"
      return !artistIsAlsoFavorite;
    })
    .filter(
      album =>
        !usersFavoriteTracks.some(track => track.album.id === album.album.id)
    );
};
