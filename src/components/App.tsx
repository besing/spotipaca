import React from 'react';

import { authenticate } from '../utils/authentication';
import { sortUserAlbums, filterUsersFavorites } from '../utils/userAlbums';
import AlbumsWrapper from './AlbumsWrapper';
import SingleAlbumContainer from '../containers/SingleAlbumContainer';
import Spinner from './Spinner';
import AlbumSortMenu from './AlbumSortMenu';

class App extends React.Component<
  {
    fetchAlbums?;
    userAlbums?;
    userAlbumsCount?;
    checkAuthTokenValidity?;
    userIsLoggedIn?;
    fetchUsersFavorites;
    usersFavorites;
    isFetchingData;
    albumsMarkedForDeletion;
    deleteAlbums;
  },
  {
    albumSortOrderBy: string;
    albumSortOrder;
    spinnerIsVisible: boolean;
    favoritesFilterIsActive: boolean;
  }
> {
  intersectionTargetRef: any;
  intersectionObserver: IntersectionObserver;

  constructor(props) {
    super(props);

    this.state = {
      albumSortOrderBy: 'added_at',
      albumSortOrder: 'descending',
      spinnerIsVisible: null,
      favoritesFilterIsActive: false
    };

    this.intersectionTargetRef = React.createRef();
  }

  componentDidMount() {
    this.props.checkAuthTokenValidity();

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.setState({
        spinnerIsVisible: !!entry.intersectionRatio
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      fetchAlbums,
      userIsLoggedIn,
      userAlbums,
      isFetchingData,
      usersFavorites
    } = this.props;
    const { spinnerIsVisible } = this.state;

    if (!prevProps.userIsLoggedIn && userIsLoggedIn) {
      this.props.userIsLoggedIn && this.props.fetchUsersFavorites();

      const currentIntersectionElement = this.intersectionTargetRef.current;
      this.props.userIsLoggedIn &&
        this.intersectionObserver.observe(currentIntersectionElement);
    }

    if (spinnerIsVisible && !isFetchingData) {
      fetchAlbums(25, userAlbums.length);
    }
  }

  handleSortOrderByChange = e => {
    this.setState({
      albumSortOrderBy: e.target.value
    });
  };

  handleSortOrderChange = e => {
    this.setState({
      albumSortOrder: e.target.value
    });
  };

  handleFavoritesFilter = e => {
    this.setState({
      favoritesFilterIsActive: !this.state.favoritesFilterIsActive
    });
  };

  render() {
    // console.log('STATE: ', this.state);
    const {
      fetchAlbums,
      userAlbums,
      userAlbumsCount,
      userIsLoggedIn,
      usersFavorites,
      albumsMarkedForDeletion,
      deleteAlbums
    } = this.props;

    const filterableAlbums = filterUsersFavorites(
      userAlbums,
      usersFavorites.artists,
      usersFavorites.tracks,
      this.state.favoritesFilterIsActive
    );

    return (
      <div className="App">
        {!userIsLoggedIn ? (
          <div>
            <h5>Please login and grant Spotify access to continue</h5>
            <button onClick={() => authenticate()}>Login</button>
          </div>
        ) : (
          !userAlbums.length && (
            <div>
              <button onClick={() => fetchAlbums(10, 0)}>
                Fetch most recent albums
              </button>
            </div>
          )
        )}
        {!!userAlbums.length && (
          <>
            <AlbumSortMenu
              sortOrderBy={this.state.albumSortOrderBy}
              sortOrder={this.state.albumSortOrder}
              onOrderByChange={this.handleSortOrderByChange}
              onSortOrderChange={this.handleSortOrderChange}
            />

            <label>
              Smart Filter
              <input
                type="checkbox"
                checked={this.state.favoritesFilterIsActive}
                onChange={this.handleFavoritesFilter}
              />
            </label>

            <div>
              {albumsMarkedForDeletion.length}{' '}
              {albumsMarkedForDeletion.length === 1 ? `Album` : `Albums`} marked
              for deletion
            </div>

            <div>
              <button
                disabled={!albumsMarkedForDeletion.length}
                onClick={() => deleteAlbums(albumsMarkedForDeletion)}
              >
                🗑 DELETE marked Albums ❌
              </button>
            </div>

            <AlbumsWrapper>
              {sortUserAlbums(
                filterableAlbums,
                this.state.albumSortOrderBy,
                this.state.albumSortOrder
              ).map((album: any) => (
                <SingleAlbumContainer key={album.album.id} id={album.album.id}>
                  <img
                    src={album.album.images[1].url}
                    width="300"
                    height="300"
                    alt={album.album.name}
                  />
                  <figcaption>{`(${album.album.popularity}) ${
                    album.album.artists[0].name
                  }: ${album.album.name}`}</figcaption>
                </SingleAlbumContainer>
              ))}
            </AlbumsWrapper>
          </>
        )}
        {userIsLoggedIn &&
          (!userAlbumsCount || userAlbums.length < userAlbumsCount) && (
            <Spinner ref={this.intersectionTargetRef} />
          )}
      </div>
    );
  }
}

export default App;
