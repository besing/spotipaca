import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import App from '../components/App';
import { AppState } from '../reducers';
import {
  fetchAlbums,
  checkAuthTokenValidity,
  fetchUsersFavorites,
  deleteAlbums
} from '../actions/thunks';

const mapStateToProps = (state: AppState) => ({
  userAlbums: state.userAlbums,
  userAlbumsCount: state.userAlbumsCount,
  userIsLoggedIn: state.authentication.userIsLoggedIn,
  usersFavorites: state.usersFavorites,
  isFetchingData: state.loadingState.isFetchingData,
  albumsMarkedForDeletion: state.albumsMarkedForDeletion
});

/**
 * Function form (more complicated) of mapDispatchToProps instead of object shorthand form
 * because of redux-thunk actions (at least because of convenient type inference through ReturnType)
 */
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchAlbums,
      checkAuthTokenValidity,
      fetchUsersFavorites,
      deleteAlbums
    },
    dispatch
  );

type IStateProps = ReturnType<typeof mapStateToProps>;
type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

export type IAppProps = IStateProps & IDispatchProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
