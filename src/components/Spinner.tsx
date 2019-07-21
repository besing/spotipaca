import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledSpinner = styled.div`
  margin: 50px;
  text-align: center;
`;

const Spinner = React.forwardRef((props, ref) => (
  <StyledSpinner>
    <CircularProgress ref={ref} color="inherit" />
  </StyledSpinner>
));

export default Spinner;
