export const sortUserAlbums = (userAlbums, orderBy) => {
  return userAlbums.slice().sort((a, b) => {
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
  });
};
