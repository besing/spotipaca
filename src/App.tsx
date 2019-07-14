import React from 'react';

import './App.css';
import {
  getFreshAuthToken,
  setAuthTokenForRequests,
  spotifyApi
} from './authentication';
import SingleAlbum from './SingleAlbum';
import AlbumsWrapper from './AlbumsWrapper';

class App extends React.Component<
  {},
  { loggedIn: boolean; userAlbums: any[]; deletedAlbumIds: string[] }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      loggedIn: false,
      userAlbums: undefined,
      deletedAlbumIds: []
    };
  }

  componentDidMount() {
    this.checkTokenValidity();
  }

  componentDidUpdate() {
    const { loggedIn, userAlbums } = this.state;

    if (loggedIn && !userAlbums) {
      this.fetchAlbums();
    }
  }

  authenticate = () => {
    getFreshAuthToken();
    setAuthTokenForRequests();
  };

  checkTokenValidity = () => {
    // After 3600ms tokens get invalidated
    // Test call to check if we're (still) successfully authenticated
    setAuthTokenForRequests();

    spotifyApi.getMySavedAlbums({ limit: 1 }).then(
      res => this.setState({ loggedIn: true }),
      err => {
        this.setState({ loggedIn: false });
        console.error('no valid token ', err);
      }
    );
  };

  fetchAlbums = () => {
    spotifyApi
      .getMySavedAlbums({ limit: 2 })
      .then(
        res => this.setState({ userAlbums: res.items }),
        err => console.error(err)
      );
  };

  deleteAlbum = albumId => {
    const { userAlbums } = this.state;

    spotifyApi.removeFromMySavedAlbums([albumId]).then(
      res => {
        this.setState(prevState => ({
          deletedAlbumIds: [...prevState.deletedAlbumIds, albumId]
        }));

        console.log('successfully deleted! id: ', albumId);
      },
      err => console.error(err)
    );
  };

  render() {
    console.log('STATE: ', this.state);
    const { userAlbums } = this.state;

    return (
      <div className="App">
        {!this.state.loggedIn ? (
          <div>
            <h5>Please login and grant Spotify access to continue</h5>
            <button onClick={() => this.authenticate()}>Login</button>
          </div>
        ) : (
          <div>
            <button onClick={this.fetchAlbums}>Fetch Albums</button>
          </div>
        )}
        {userAlbums && (
          <AlbumsWrapper>
            {userAlbums.map((album: any) => (
              <SingleAlbum
                key={album.album.id}
                onDeleteClick={() => this.deleteAlbum(album.album.id)}
                albumDeleted={this.state.deletedAlbumIds.includes(
                  album.album.id
                )}
              >
                <img
                  src={album.album.images[1].url}
                  width="300"
                  height="300"
                  alt={album.album.name}
                />
                <figcaption>{`${album.album.artists[0].name}: ${
                  album.album.name
                }`}</figcaption>
              </SingleAlbum>
            ))}
          </AlbumsWrapper>
        )}
      </div>
    );
  }
}

export default App;
