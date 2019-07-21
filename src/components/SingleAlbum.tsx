import React from 'react';
import styled from 'styled-components';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';
import { withStyles } from '@material-ui/styles';

const StyledAlbumPlaceholder = styled.div`
  width: 18vw;
  height: 18vw;
  margin: 0 3px 3px 0;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
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
  color: rgba(245, 97, 97, 0.8);
  z-index: 1;
`;

const StyledMarkForDeletionButton = withStyles({
  root: {
    width: '50%',
    height: '50%'
  }
})(IndeterminateCheckBox);

const StyledSingleAlbum = styled.figure<{
  markedForDeletion: boolean;
}>`
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

  figcaption {
    position: absolute;
    z-index: 1;
    bottom: 3px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 100%;
  }

  ${StyledOverlay} {
    opacity: ${props => props.markedForDeletion && 1};
  }
`;

const SingleAlbum = ({
  id,
  markAlbumForDeletion,
  albumsMarkedForDeletion,
  children
}) => {
  return (
    <StyledAlbumPlaceholder>
      <StyledSingleAlbum
        markedForDeletion={albumsMarkedForDeletion.includes(id)}
      >
        {children}
        <StyledOverlay onClick={() => markAlbumForDeletion(id)}>
          <StyledMarkForDeletionButton />
        </StyledOverlay>
      </StyledSingleAlbum>
    </StyledAlbumPlaceholder>
  );
};

export default SingleAlbum;
