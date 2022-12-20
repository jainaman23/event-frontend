import React from 'react';
import MuiButton from '@mui/material/Button';
import MuiTooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function TableActionButton(props) {
  const { disabled } = props;
  return (
    <MuiTooltip title={disabled ? 'You do not have permission to do this' : ''}>
      <Box component="span" sx={{ display: 'inline-block' }}>
        <MuiButton {...props} size="small" />
      </Box>
    </MuiTooltip>
  );
}
