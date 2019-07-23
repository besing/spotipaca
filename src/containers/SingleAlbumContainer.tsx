import { connect } from 'react-redux';

import { markAlbumForDeletion } from '../actions';
import SingleAlbum from '../components/SingleAlbum';
import { AppState } from '../reducers';

export type ISingleAlbumProps = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps = (state: AppState) => ({
  albumsMarkedForDeletion: state.albumsMarkedForDeletion
});

const mapDispatchToProps = {
  markAlbumForDeletion
};

type IStateProps = ReturnType<typeof mapStateToProps>;
type IDispatchProps = typeof mapDispatchToProps;
interface IOwnProps {
  albumImageSize: 'small' | 'large';
  albumName: string;
  albumArtist: string;
  id: string;
  children: React.ReactNode;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleAlbum);
