import React from 'react';
import styled from 'styled-components';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';
import { withStyles } from '@material-ui/styles';
import { ISingleAlbumProps } from '../containers/SingleAlbumContainer';

const StyledAlbumPlaceholder = styled.div<Partial<ISingleAlbumProps>>`
  width: ${props => (props.albumImageSize === 'large' ? '300px' : '150px')};
  height: ${props => (props.albumImageSize === 'large' ? '300px' : '150px')};
  margin: 0 5px 5px 0;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.2s all ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(226, 57, 57, 1);
  z-index: 1;
`;

const StyledMarkForDeletionButton = withStyles({
  root: {
    width: '50%',
    height: '50%'
  }
})(IndeterminateCheckBox);

const StyledSingleAlbum = styled.figure<{ markedForDeletion: boolean }>`
  margin: 0;
  font-size: 12px;

  &:hover {
    cursor: pointer;

    ${StyledOverlay} {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: auto;
    opacity: ${props => (props.markedForDeletion ? '0.5' : 1)};
    transition: opacity 0.2s ease-in-out;
    filter: ${props => props.markedForDeletion && `grayscale()`};
  }

  ${StyledOverlay} {
    opacity: ${props => props.markedForDeletion && 1};
  }
`;

const StyledCaption = styled.figcaption<Partial<ISingleAlbumProps>>`
  position: absolute;
  z-index: 1;
  bottom: 5px;
  padding: 5px 10px 5px 5px;
  font-size: ${props => (props.albumImageSize === 'small' ? '12px' : '16px')};
  background: #000;
  color: #d0d0d0;

  div:first-child {
    margin-bottom: 4px;
  }
`;

const SingleAlbum = ({
  id,
  markAlbumForDeletion,
  albumsMarkedForDeletion,
  albumImageSize,
  albumName,
  albumArtist,
  children
}: ISingleAlbumProps) => {
  return (
    <StyledAlbumPlaceholder albumImageSize={albumImageSize}>
      <StyledSingleAlbum
        markedForDeletion={albumsMarkedForDeletion.includes(id)}
      >
        {children}
        <StyledCaption albumImageSize={albumImageSize}>
          <div>{albumArtist}</div>
          <div>{albumName}</div>
        </StyledCaption>
        <StyledOverlay onClick={() => markAlbumForDeletion(id)}>
          <StyledMarkForDeletionButton />
        </StyledOverlay>
      </StyledSingleAlbum>
    </StyledAlbumPlaceholder>
  );
};

export default SingleAlbum;
