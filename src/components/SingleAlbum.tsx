import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledAlbumDeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const AlbumDeleteButton = ({ markAlbumForDeletion, id }) => (
  <StyledAlbumDeleteButton onClick={() => markAlbumForDeletion(id)}>
    X
  </StyledAlbumDeleteButton>
);

const StyledAlbumPlaceholder = styled.div`
  width: 18vw;
  height: 18vw;
  margin: 0 3px 3px 0;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
`;

const StyledSingleAlbum = styled.figure<{
  markedForDeletion: boolean;
}>`
  margin: 0;
  font-size: 12px;

  opacity: ${props => (props.markedForDeletion ? '0.2' : 1)};
  transition: opacity 0.2s ease-in-out;

  img {
    width: 100%;
    height: auto;
  }

  figcaption {
    position: absolute;
    z-index: 1;
    bottom: 3px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 100%;
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
        <AlbumDeleteButton
          markAlbumForDeletion={markAlbumForDeletion}
          id={id}
        />
        {children}
      </StyledSingleAlbum>
    </StyledAlbumPlaceholder>
  );
};

export default SingleAlbum;
