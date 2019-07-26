import { sortUserAlbums } from '../userAlbums';

describe('sortUserAlbums', () => {
  const albumName1 = 'Less popular Album';
  const albumName2 = 'More popular Album';
  const userAlbums = [
    {
      album: {
        name: albumName1,
        popularity: 10
      },
      added_at: '2009-05-02T11:51:58Z'
    },
    {
      album: {
        name: albumName2,
        popularity: 20
      },
      added_at: '2019-05-02T11:51:58Z'
    }
  ];

  it('returns albums by popularity in the right order', () => {
    const sorted = sortUserAlbums(userAlbums, 'popularity', 'descending');
    const sortedNames = sorted.map(album => album.album.name);

    expect(sortedNames).toEqual([albumName2, albumName1]);
  });

  it('returns albums by date in the right order', () => {
    const sorted = sortUserAlbums(userAlbums, 'added_at', 'ascending');
    const sortedNames = sorted.map(album => album.album.name);

    expect(sortedNames).toEqual([albumName1, albumName2]);
  });
});
