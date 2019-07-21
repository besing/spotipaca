import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

interface IDeleteButton {
  label: string;
  onButtonClick: () => void;
  disabled: boolean;
}

const DeleteButton = ({ label, onButtonClick, disabled }: IDeleteButton) => (
  <Button
    variant="outlined"
    color="secondary"
    disableRipple
    onClick={onButtonClick}
    disabled={disabled}
  >
    {label}
    <DeleteIcon />
  </Button>
);

export default DeleteButton;
