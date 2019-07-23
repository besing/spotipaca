import React from 'react';
import styled from 'styled-components';
import ViewComfy from '@material-ui/icons/ViewComfy';
import ViewModule from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/styles';

import { COLORS } from '../utils/constants';

interface IAlbumSizeToggleProps {
  currentSize: 'large' | 'small';
  handleAlbumSizeToggleChange: (
    e: React.BaseSyntheticEvent,
    value: IAlbumSizeToggleProps['currentSize']
  ) => void;
}

const StyleOverwriteWrapper = styled.div`
  margin-right: 30px;

  .MuiToggleButton-root.Mui-selected {
    background: ${COLORS.spotifyGreen};
  }
  .MuiToggleButton-root:hover {
    background: rgba(${COLORS.spotifyGreenRgb}, 0.6);
  }
`;

const StyledToggleButton = withStyles({
  root: {
    background: `rgba(${COLORS.spotifyGreenRgb}, 0.5)`
  },
  label: {
    color: COLORS.bgColorPrimary
  }
})(ToggleButton);

const AlbumSizeToggle = ({
  currentSize,
  handleAlbumSizeToggleChange
}: IAlbumSizeToggleProps) => (
  <StyleOverwriteWrapper>
    <ToggleButtonGroup
      value={currentSize}
      onChange={(e, value) => handleAlbumSizeToggleChange(e, value)}
      exclusive
      size="small"
    >
      <StyledToggleButton
        value="small"
        disableRipple
        disabled={currentSize === 'small'}
      >
        <ViewComfy />
      </StyledToggleButton>
      <StyledToggleButton
        value="large"
        disableRipple
        disabled={currentSize === 'large'}
      >
        <ViewModule />
      </StyledToggleButton>
    </ToggleButtonGroup>
  </StyleOverwriteWrapper>
);

export default AlbumSizeToggle;
