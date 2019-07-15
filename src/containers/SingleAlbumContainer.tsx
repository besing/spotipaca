import { connect } from 'react-redux';

import { markAlbumForDeletion } from '../actions';
import SingleAlbum from '../components/SingleAlbum';

const mapStateToProps = state => ({
  albumsMarkedForDeletion: state.albumsMarkedForDeletion
});

export default connect(
  mapStateToProps,
  { markAlbumForDeletion }
)(SingleAlbum);
