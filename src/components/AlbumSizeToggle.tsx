import React from 'react';
import styled from 'styled-components';
import ViewComfy from '@material-ui/icons/ViewComfy';
import ViewModule from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/styles';

interface IAlbumSizeToggleProps {
  currentSize: 'large' | 'small';
  handleAlbumSizeToggleChange: (
    e: React.BaseSyntheticEvent,
    value: IAlbumSizeToggleProps['currentSize']
  ) => void;
}

const StyleOverwriteWrapper = styled.div`
  .MuiToggleButton-root.Mui-selected {
    background: red;
  }
`;

const StyledToggleButton = withStyles({
  root: {
    background: 'green'
  },
  selected: {
    background: 'blue'
  },
  disabled: {
    background: 'blue'
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
