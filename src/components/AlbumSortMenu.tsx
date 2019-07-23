import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
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
  margin-bottom: 8px;

  @media (min-width: 400px) {
    margin-right: 20px;
  }
`;

const StyledLabel = styled.span`
  margin-right: 12px;
  flex-shrink: 0;
  opacity: 0.5;
`;

const StyledFormControl = withStyles({
  root: {
    marginRight: '10px',
    position: 'relative',
    top: '-6px'
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
