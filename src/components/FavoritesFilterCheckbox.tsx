import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';

interface IFavoritesFilterCheckboxProps {
  filterActive: boolean;
  label: string;
  handleFavoritesFilterChange: () => void;
}

const StyledFormControlLabel = withStyles({
  label: {
    fontFamily: 'inherit'
  }
})(FormControlLabel);

const FavoritesFilterCheckbox = ({
  filterActive,
  label,
  handleFavoritesFilterChange
}: IFavoritesFilterCheckboxProps) => (
  <StyledFormControlLabel
    control={
      <Checkbox
        checked={filterActive}
        onChange={handleFavoritesFilterChange}
        value="checkedA"
        disableRipple
      />
    }
    label={label}
  />
);

export default FavoritesFilterCheckbox;
