import React from 'react';

import { authenticate } from '../utils/authentication';
import AlbumsWrapper from './AlbumsWrapper';
import store from '../store';
import SingleAlbumContainer from '../containers/SingleAlbumContainer';

class App extends React.Component<{
  fetchAlbums?;
  userAlbums?;
  userAlbumsCount?;
  checkAuthTokenValidity?;
  userIsLoggedIn?;
}> {
  componentDidMount() {
    this.props.checkAuthTokenValidity();
  }

  componentDidUpdate() {
    const { fetchAlbums, userIsLoggedIn, userAlbums } = this.props;

    if (userIsLoggedIn && !userAlbums.length) {
      fetchAlbums(10, 0);
    }
  }

  render() {
    console.log('STATE: ', this.state);
    const {
      fetchAlbums,
      userAlbums,
      userAlbumsCount,
      userIsLoggedIn
    } = this.props;
    console.log('store.getState()', store.getState());
    console.log('this.props', this.props);

    return (
      <div className="App">
        {!userIsLoggedIn ? (
          <div>
            <h5>Please login and grant Spotify access to continue</h5>
            <button onClick={() => authenticate()}>Login</button>
          </div>
        ) : (
          userAlbums.length === 0 && (
            <div>
              <button onClick={() => fetchAlbums(10, 0)}>
                Fetch most recent albums
              </button>
            </div>
          )
        )}
        {userAlbums && (
          <>
            <AlbumsWrapper>
              {userAlbums.map((album: any) => (
                <SingleAlbumContainer key={album.album.id} id={album.album.id}>
                  <img
                    src={album.album.images[1].url}
                    width="300"
                    height="300"
                    alt={album.album.name}
                  />
                  <figcaption>{`${album.album.artists[0].name}: ${
                    album.album.name
                  }`}</figcaption>
                </SingleAlbumContainer>
              ))}
            </AlbumsWrapper>
            {userAlbums.length < userAlbumsCount && (
              <button onClick={() => fetchAlbums(50, userAlbums.length)}>
                Fetch more albums
              </button>
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
