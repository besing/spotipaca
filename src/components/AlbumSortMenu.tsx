import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface IAlbumSortMenuProps {
  sortOrderBy: 'added_at' | 'popularity';
  sortOrder: 'ascending' | 'descending';
  onOrderByChange: (e: React.BaseSyntheticEvent) => void;
  onSortOrderChange: (e: React.BaseSyntheticEvent) => void;
}

const StyledAlbumSortMenu = styled.div`
  margin: 1em;
`;

const AlbumSortMenu = ({
  sortOrderBy,
  sortOrder,
  onOrderByChange,
  onSortOrderChange
}: IAlbumSortMenuProps) => (
  <StyledAlbumSortMenu>
    <FormControl>
      <InputLabel shrink>Sort by</InputLabel>
      <Select value={sortOrderBy} onChange={e => onOrderByChange(e)}>
        <MenuItem value="added_at">Most recent</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
      </Select>
    </FormControl>
    <FormControl>
      <Select value={sortOrder} onChange={e => onSortOrderChange(e)}>
        <MenuItem value="descending">Descending</MenuItem>
        <MenuItem value="ascending">Ascending</MenuItem>
      </Select>
    </FormControl>
  </StyledAlbumSortMenu>
);

export default AlbumSortMenu;
