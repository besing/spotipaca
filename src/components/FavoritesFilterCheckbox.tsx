import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';

import { COLORS } from '../utils/constants';

interface IFavoritesFilterCheckboxProps {
  filterActive: boolean;
  label: string;
  handleFavoritesFilterChange: () => void;
}

const StyledFormControlLabel = withStyles({
  label: {
    fontWeight: 'bold'
  }
})(FormControlLabel);

const StyledCheckbox = withStyles({
  root: {
    color: COLORS.spotifyGreen
  },
  checked: {
    color: COLORS.spotifyGreen
  }
})(Checkbox);

const FavoritesFilterCheckbox = ({
  filterActive,
  label,
  handleFavoritesFilterChange
}: IFavoritesFilterCheckboxProps) => (
  <StyledFormControlLabel
    control={
      <StyledCheckbox
        color="default"
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
