import React from 'react';
import styled from 'styled-components';

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
    <label>
      Sort albums by
      <select value={sortOrderBy} onChange={e => onOrderByChange(e)}>
        <option value="added_at">Date</option>
        <option value="popularity">Popularity</option>
      </select>
    </label>
    <select value={sortOrder} onChange={e => onSortOrderChange(e)}>
      <option value="descending">descending</option>
      <option value="ascending">ascending</option>
    </select>
  </StyledAlbumSortMenu>
);

export default AlbumSortMenu;
