import React from 'react';

import { authenticate } from '../utils/authentication';
import { sortUserAlbums } from '../utils/userAlbums';
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
  },
  { albumSortOrderBy: string; albumSortOrder; spinnerIsVisible: boolean }
> {
  intersectionTargetRef: any;
  intersectionObserver: IntersectionObserver;

  constructor(props) {
    super(props);

    this.state = {
      albumSortOrderBy: 'added_at',
      albumSortOrder: 'descending',
      spinnerIsVisible: null
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

    const currentIntersectionElement = this.intersectionTargetRef.current;
    this.intersectionObserver.observe(currentIntersectionElement);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      fetchAlbums,
      userIsLoggedIn,
      userAlbums,
      isFetchingData
    } = this.props;
    const { spinnerIsVisible } = this.state;

    prevProps.userIsLoggedIn !== userIsLoggedIn &&
      this.props.fetchUsersFavorites();

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

  render() {
    console.log('STATE: ', this.state);
    const {
      fetchAlbums,
      userAlbums,
      userAlbumsCount,
      userIsLoggedIn
    } = this.props;

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
            <AlbumsWrapper>
              {sortUserAlbums(
                userAlbums,
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
        {(!userAlbumsCount || userAlbums.length < userAlbumsCount) && (
          <Spinner
            ref={this.intersectionTargetRef}
            id="loadingSpinnerPageBottom"
          >
            Loading...
          </Spinner>
        )}
      </div>
    );
  }
}

export default App;
