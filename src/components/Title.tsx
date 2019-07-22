import React from 'react';
import styled from 'styled-components';
import { spotifyGreen } from '../utils/constants';

const StyledTitle = styled.h1`
  font-family: 'Abril Fatface', 'Roboto', sans-serif;
  color: ${spotifyGreen};
  font-weight: normal;
  font-size: 50px;
  text-align: center;
  margin: 70px;
`;

const Title = () => <StyledTitle>spotipaca</StyledTitle>;

export default Title;
