import React from 'react';

import { spotifyApi, authenticate } from '../utils/authentication';
import AlbumsWrapper from './AlbumsWrapper';
import store from '../store';
import SingleAlbumContainer from '../containers/SingleAlbumContainer';

class App extends React.Component<{
  fetchAlbums?;
  userAlbums?;
  checkAuthTokenValidity?;
  userIsLoggedIn?;
}> {
  componentDidMount() {
    this.props.checkAuthTokenValidity();
  }

  componentDidUpdate() {
    const { fetchAlbums, userIsLoggedIn, userAlbums } = this.props;

    if (userIsLoggedIn && !userAlbums.length) {
      fetchAlbums();
    }
  }

  // deleteAlbum = albumId => {
  //   spotifyApi.removeFromMySavedAlbums([albumId]).then(
  //     res => {
  //       this.setState(prevState => ({
  //         deletedAlbumIds: [...prevState.deletedAlbumIds, albumId]
  //       }));

  //       console.log('successfully deleted! id: ', albumId);
  //     },
  //     err => console.error(err)
  //   );
  // };

  render() {
    console.log('STATE: ', this.state);
    const { fetchAlbums, userAlbums, userIsLoggedIn } = this.props;
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
          <div>
            <button onClick={() => fetchAlbums()}>Fetch Albums</button>
          </div>
        )}
        {userAlbums && (
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
        )}
      </div>
    );
  }
}

export default App;
