import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

interface ILoginPromptProps {
  onButtonClick: () => void;
}

const StyledLoginPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20vh 5vw;
  text-align: center;
  color: #d4d4d4;

  h2 {
    font-size: 1.5em;
  }
`;

// TODO: Add Logo

const LoginPrompt = ({ onButtonClick }: ILoginPromptProps) => (
  <StyledLoginPrompt>
    <h2>Please login and grant Spotify access to continue</h2>
    <Button
      variant="contained"
      color="default"
      disableRipple
      onClick={onButtonClick}
    >
      Login
    </Button>
  </StyledLoginPrompt>
);

export default LoginPrompt;
