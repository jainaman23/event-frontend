import React from 'react';
import Grid from '@mui/material/Grid';

const GridItem = React.forwardRef(({ children, ...props }, ref) => (
  <Grid item {...props} ref={ref}>
    {children}
  </Grid>
));

GridItem.displayName = 'GridItem';

export default GridItem;
