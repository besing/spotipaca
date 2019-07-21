import React from 'react';
import ViewComfy from '@material-ui/icons/ViewComfy';
import ViewModule from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface IAlbumSizeToggleProps {
  currentSize: 'large' | 'small';
  handleAlbumSizeToggleChange: (
    e: React.BaseSyntheticEvent,
    value: IAlbumSizeToggleProps['currentSize']
  ) => void;
}

const AlbumSizeToggle = ({
  currentSize,
  handleAlbumSizeToggleChange
}: IAlbumSizeToggleProps) => (
  <ToggleButtonGroup
    value={currentSize}
    onChange={(e, value) => handleAlbumSizeToggleChange(e, value)}
    exclusive
  >
    <ToggleButton value="small" disableRipple>
      <ViewComfy />
    </ToggleButton>
    <ToggleButton value="large" disableRipple>
      <ViewModule />
    </ToggleButton>
  </ToggleButtonGroup>
);

export default AlbumSizeToggle;
