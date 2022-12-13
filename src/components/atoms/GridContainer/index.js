import React from 'react';
import Grid from '@mui/material/Grid';

const GridContainer = React.forwardRef(({ children, ...props }, ref) => (
  <Grid container {...props} ref={ref}>
    {children}
  </Grid>
));

GridContainer.displayName = 'GridContainer';

export default GridContainer;
