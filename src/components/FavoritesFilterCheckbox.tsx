import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';
import styled from 'styled-components';

import { COLORS } from '../utils/constants';

interface IFavoritesFilterCheckboxProps {
  filterActive: boolean;
  label: string;
  handleFavoritesFilterChange: () => void;
}

const StyledFavoritesFilterCheckbox = styled.div`
  flex-shrink: 0;
  position: relative;
  /* compensating the implicit padding-top of Material UI component to align vertically with other items */
  top: -11px;
`;

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
  <StyledFavoritesFilterCheckbox>
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
  </StyledFavoritesFilterCheckbox>
);

export default FavoritesFilterCheckbox;
