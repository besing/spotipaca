import React from 'react';
import styled from 'styled-components';

import { authenticate } from '../utils/authentication';
import {
  sortUserAlbums,
  filterUsersFavorites,
  getAlbumI18n
} from '../utils/userAlbums';
import { COLORS } from '../utils/constants';
import SingleAlbumContainer from '../containers/SingleAlbumContainer';
import { IAppProps } from '../containers/AppContainer';
import AlbumsWrapper from './AlbumsWrapper';
import Spinner from './Spinner';
import Title from './Title';
import AlbumSortMenu from './AlbumSortMenu';
import AlbumSizeToggle from './AlbumSizeToggle';
import FavoritesFilterCheckbox from './FavoritesFilterCheckbox';
import DeleteButton from './DeleteButton';
import LoginPrompt from './LoginPrompt';

interface IAppState {
  albumSortOrderBy: 'added_at' | 'popularity';
  albumSortOrder: 'ascending' | 'descending';
  spinnerIsVisible: boolean;
  favoritesFilterIsActive: boolean;
  albumImageSize: 'small' | 'large';
}

const StyledApp = styled.div`
  min-height: 100vh;
  padding: 0 10px;
  background: ${COLORS.bgColorPrimary};
  color: ${COLORS.fontColorPrimary};
  border-top: 20px solid ${COLORS.spotifyGreen};

  @media (min-width: 550px) {
    padding: 0 40px;
  }

  @media (min-width: 1100px) {
    padding: 0 60px;
  }
`;

const StyledToolbarTop = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledToolbarBottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & > * {
    margin-bottom: 25px;
  }
`;

class App extends React.Component<IAppProps, IAppState> {
  intersectionTargetRef: any;
  intersectionObserver!: IntersectionObserver;

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      albumSortOrderBy: 'added_at',
      albumSortOrder: 'descending',
      spinnerIsVisible: false,
      favoritesFilterIsActive: false,
      albumImageSize: 'large'
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

  componentDidUpdate(prevProps: IAppProps) {
    const {
      fetchAlbums,
      userIsLoggedIn,
      userAlbums,
      isFetchingData
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

  handleSortOrderByChange = (e: React.BaseSyntheticEvent) => {
    this.setState({
      albumSortOrderBy: e.target.value
    });
  };

  handleSortOrderChange = (e: React.BaseSyntheticEvent) => {
    this.setState({
      albumSortOrder: e.target.value
    });
  };

  handleFavoritesFilter = () => {
    this.setState({
      favoritesFilterIsActive: !this.state.favoritesFilterIsActive
    });
  };

  handleAlbumSizeToggle = (
    e: React.BaseSyntheticEvent,
    value: IAppState['albumImageSize']
  ) => {
    this.setState({
      albumImageSize: value
    });
  };

  render() {
    const {
      userAlbums,
      userAlbumsCount,
      userIsLoggedIn,
      usersFavorites,
      albumsMarkedForDeletion,
      deleteAlbums
    } = this.props;

    const {
      favoritesFilterIsActive,
      albumImageSize,
      albumSortOrder,
      albumSortOrderBy
    } = this.state;

    const filterableAlbums = filterUsersFavorites(
      userAlbums,
      usersFavorites.artists,
      usersFavorites.tracks,
      favoritesFilterIsActive
    );

    const deleteButtonLabel = `Delete ${
      albumsMarkedForDeletion.length > 1 ? albumsMarkedForDeletion.length : ''
    } selected ${getAlbumI18n(albumsMarkedForDeletion)}`;

    return (
      <div className="App">
        <StyledApp>
          <Title />
          {!userIsLoggedIn && (
            <LoginPrompt onButtonClick={() => authenticate()} />
          )}
          {!!userAlbums.length && (
            <>
              <StyledToolbarTop>
                <>
                  <AlbumSortMenu
                    sortOrderBy={albumSortOrderBy}
                    sortOrder={albumSortOrder}
                    onOrderByChange={this.handleSortOrderByChange}
                    onSortOrderChange={this.handleSortOrderChange}
                  />
                  <FavoritesFilterCheckbox
                    filterActive={favoritesFilterIsActive}
                    label="Smart Filter"
                    handleFavoritesFilterChange={this.handleFavoritesFilter}
                  />
                </>
              </StyledToolbarTop>

              <StyledToolbarBottom>
                <AlbumSizeToggle
                  currentSize={albumImageSize}
                  handleAlbumSizeToggleChange={this.handleAlbumSizeToggle}
                />
                <DeleteButton
                  onButtonClick={() => deleteAlbums(albumsMarkedForDeletion)}
                  label={deleteButtonLabel}
                  disabled={!albumsMarkedForDeletion.length}
                />
              </StyledToolbarBottom>
              <AlbumsWrapper>
                {sortUserAlbums(
                  filterableAlbums,
                  albumSortOrderBy,
                  albumSortOrder
                ).map(album => (
                  <SingleAlbumContainer
                    key={album.album.id}
                    id={album.album.id}
                    albumImageSize={albumImageSize}
                    albumName={album.album.name}
                    albumArtist={album.album.artists[0].name}
                  >
                    <img
                      src={album.album.images[1].url}
                      width="300"
                      height="300"
                      alt={album.album.name}
                    />
                  </SingleAlbumContainer>
                ))}
              </AlbumsWrapper>
            </>
          )}
          {userIsLoggedIn &&
            (!userAlbumsCount || userAlbums.length < userAlbumsCount) && (
              <Spinner ref={this.intersectionTargetRef} />
            )}
        </StyledApp>
      </div>
    );
  }
}

export default App;
