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
  margin: 80px 0;
  text-align: center;
  color: #d4d4d4;

  h2 {
    font-size: 1.5em;
  }
`;

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
