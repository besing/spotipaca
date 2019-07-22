import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';

import { spotifyGreen } from '../utils/constants';

interface IFavoritesFilterCheckboxProps {
  filterActive: boolean;
  label: string;
  handleFavoritesFilterChange: () => void;
}

const StyledCheckbox = withStyles({
  root: {
    color: spotifyGreen
  },
  checked: {
    color: spotifyGreen
  }
})(Checkbox);

const FavoritesFilterCheckbox = ({
  filterActive,
  label,
  handleFavoritesFilterChange
}: IFavoritesFilterCheckboxProps) => (
  <FormControlLabel
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
