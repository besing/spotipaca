import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';

import { COLORS } from '../utils/constants';

interface IAlbumSortMenuProps {
  sortOrderBy: 'added_at' | 'popularity';
  sortOrder: 'ascending' | 'descending';
  onOrderByChange: (e: React.BaseSyntheticEvent) => void;
  onSortOrderChange: (e: React.BaseSyntheticEvent) => void;
}

const StyledAlbumSortMenu = styled.div`
  display: flex;
`;

const StyledLabel = styled.span`
  padding-top: 6px; /* using the Material UI FormControl CSS value to align vertically */
  margin-right: 12px;
`;

const StyledFormControl = withStyles({
  root: {
    marginRight: '10px'
  }
})(FormControl);

const StyledSelect = withStyles({
  root: {
    color: COLORS.fontColorPrimary
  },
  icon: {
    color: COLORS.spotifyGreen
  }
})(Select);

const AlbumSortMenu = ({
  sortOrderBy,
  sortOrder,
  onOrderByChange,
  onSortOrderChange
}: IAlbumSortMenuProps) => (
  <StyledAlbumSortMenu>
    <StyledLabel>Sort by</StyledLabel>
    <StyledFormControl>
      <StyledSelect
        value={sortOrderBy}
        onChange={e => onOrderByChange(e)}
        disableUnderline
      >
        <MenuItem value="added_at">Most recent</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
      </StyledSelect>
    </StyledFormControl>
    <StyledFormControl>
      <StyledSelect
        value={sortOrder}
        onChange={e => onSortOrderChange(e)}
        disableUnderline
      >
        <MenuItem value="descending">Descending</MenuItem>
        <MenuItem value="ascending">Ascending</MenuItem>
      </StyledSelect>
    </StyledFormControl>
  </StyledAlbumSortMenu>
);

export default AlbumSortMenu;
