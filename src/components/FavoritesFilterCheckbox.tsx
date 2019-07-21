import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface IFavoritesFilterCheckboxProps {
  filterActive: boolean;
  label: string;
  handleFavoritesFilterChange: () => void;
}

const FavoritesFilterCheckbox = ({
  filterActive,
  label,
  handleFavoritesFilterChange
}: IFavoritesFilterCheckboxProps) => (
  <FormControlLabel
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
