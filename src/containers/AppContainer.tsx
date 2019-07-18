import { connect } from 'react-redux';

import { fetchAlbums, checkAuthTokenValidity } from '../actions';
import App from '../components/App';

const mapStateToProps = state => ({
  userAlbums: state.userAlbums,
  userAlbumsCount: state.userAlbumsCount,
  userIsLoggedIn: state.authentication.userIsLoggedIn
});

export default connect(
  mapStateToProps,
  { fetchAlbums, checkAuthTokenValidity }
)(App);
