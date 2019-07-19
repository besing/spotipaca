import React from 'react';
import styled from 'styled-components';

const StyledAlbumSortMenu = styled.div`
  margin: 1em;
`;

const AlbumSortMenu = ({
  sortOrderBy,
  sortOrder,
  onOrderByChange,
  onSortOrderChange
}) => (
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
