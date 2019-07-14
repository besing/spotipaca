import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ISingleAlbumProps {
  children: ReactNode;
}

const StyledAlbumDeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const AlbumDeleteButton = ({ onDeleteClick }) => (
  <StyledAlbumDeleteButton onClick={onDeleteClick}>X</StyledAlbumDeleteButton>
);

const StyledSingleAlbum = styled.figure<{ deleted: boolean }>`
  width: calc(20% - 3px);
  height: calc(20% - 3px);
  margin: 0 3px 3px 0;
  font-size: 12px;
  position: relative;

  opacity: ${props => (props.deleted ? '0.1' : 1)};
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

class SingleAlbum extends React.Component<
  { children: any; onDeleteClick: any; albumDeleted: boolean },
  {}
> {
  constructor(props) {
    super(props);

    this.state = {
      albumDeleted: false
    };
  }

  render() {
    const { onDeleteClick, children, albumDeleted } = this.props;

    return (
      <StyledSingleAlbum deleted={albumDeleted}>
        <AlbumDeleteButton onDeleteClick={onDeleteClick} />
        {children}
      </StyledSingleAlbum>
    );
  }
}

export default SingleAlbum;
