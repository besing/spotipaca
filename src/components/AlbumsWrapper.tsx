import React from 'react';
import styled from 'styled-components';

const StyledAlbumsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
`;

const AlbumsWrapper = ({ children }) => (
  <StyledAlbumsWrapper>{children}</StyledAlbumsWrapper>
);

export default AlbumsWrapper;
