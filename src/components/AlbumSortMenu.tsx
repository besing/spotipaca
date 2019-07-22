import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';

import { fontColorPrimary, spotifyGreen } from '../utils/constants';

interface IAlbumSortMenuProps {
  sortOrderBy: 'added_at' | 'popularity';
  sortOrder: 'ascending' | 'descending';
  onOrderByChange: (e: React.BaseSyntheticEvent) => void;
  onSortOrderChange: (e: React.BaseSyntheticEvent) => void;
}

const StyledAlbumSortMenu = styled.div`
  margin: 1em;
`;

const StyledSelect = withStyles({
  root: {
    color: fontColorPrimary
  },
  icon: {
    color: spotifyGreen
  }
})(Select);

const AlbumSortMenu = ({
  sortOrderBy,
  sortOrder,
  onOrderByChange,
  onSortOrderChange
}: IAlbumSortMenuProps) => (
  <StyledAlbumSortMenu>
    <span>Sort by</span>
    <FormControl>
      <StyledSelect
        value={sortOrderBy}
        onChange={e => onOrderByChange(e)}
        disableUnderline
      >
        <MenuItem value="added_at">Most recent</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
      </StyledSelect>
    </FormControl>
    <FormControl>
      <StyledSelect
        value={sortOrder}
        onChange={e => onSortOrderChange(e)}
        disableUnderline
      >
        <MenuItem value="descending">Descending</MenuItem>
        <MenuItem value="ascending">Ascending</MenuItem>
      </StyledSelect>
    </FormControl>
  </StyledAlbumSortMenu>
);

export default AlbumSortMenu;
