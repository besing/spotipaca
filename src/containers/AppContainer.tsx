import { connect } from 'react-redux';

import {
  fetchAlbums,
  checkAuthTokenValidity,
  fetchUsersFavorites
} from '../actions';
import App from '../components/App';

const mapStateToProps = state => ({
  userAlbums: state.userAlbums,
  userAlbumsCount: state.userAlbumsCount,
  userIsLoggedIn: state.authentication.userIsLoggedIn,
  usersFavorites: state.usersFavorites,
  isFetchingData: state.loadingState.isFetchingData,
  albumsMarkedForDeletion: state.albumsMarkedForDeletion
});

export default connect(
  mapStateToProps,
  {
    fetchAlbums,
    checkAuthTokenValidity,
    fetchUsersFavorites
  }
)(App);
