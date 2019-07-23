import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { COLORS } from '../utils/constants';
import { withStyles } from '@material-ui/styles';

interface IDeleteButtonProps {
  label: string;
  onButtonClick: () => void;
  disabled: boolean;
}

const StyleOverwriteWrapper = styled.div`
  .MuiButton-contained.Mui-disabled {
    background: rgba(255, 255, 255, 0.25);

    .MuiButton-label {
      color: #808080;
    }
  }
  .MuiButton-contained {
    background: ${COLORS.error};
    font-weight: bold;

    svg {
      margin-left: 5px;
    }
  }

  .MuiButton-contained:hover {
    background: ${COLORS.errorDarker};
  }
`;

const StyledButton = withStyles({
  label: {
    color: COLORS.fontColorPrimary
  }
})(Button);

const DeleteButton = ({
  label,
  onButtonClick,
  disabled
}: IDeleteButtonProps) => (
  <StyleOverwriteWrapper>
    <StyledButton
      variant="contained"
      color="secondary"
      disableRipple
      onClick={onButtonClick}
      disabled={disabled}
    >
      {label}
      <DeleteIcon />
    </StyledButton>
  </StyleOverwriteWrapper>
);

export default DeleteButton;
