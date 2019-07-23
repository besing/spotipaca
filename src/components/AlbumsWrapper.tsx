import React from 'react';
import styled from 'styled-components';

const StyledAlbumsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 690px) {
    margin-top: 20px;
  }
`;

const AlbumsWrapper: React.FunctionComponent = ({ children }) => (
  <StyledAlbumsWrapper>{children}</StyledAlbumsWrapper>
);

export default AlbumsWrapper;
