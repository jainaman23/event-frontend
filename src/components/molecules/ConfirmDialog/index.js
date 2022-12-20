import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Container from '@components/atoms/GridContainer';
import Item from '@components/atoms/GridItem';

const text = 'Are you sure you want to permanently remove this item?';
const label = 'Subscribe';

export default function ConfirmDialog(props) {
  const {
    onAccept,
    onCancel,
    title = label,
    dialogText = text,
    acceptLabel = 'Continue',
    rejectedLabel = 'Cancel',
    Icon = WarningRoundedIcon,
  } = props;
  let { dialogActions } = props;

  if (!dialogActions) {
    dialogActions = [
      <Button
        key={1}
        size="small"
        variant="outlined"
        onClick={onCancel}
        sx={{ mb: 0, mr: 2, p: 0 }}
      >
        {rejectedLabel}
      </Button>,
      <Button key={2} size="small" onClick={onAccept} sx={{ mb: 0 }}>
        {acceptLabel}
      </Button>,
    ];
  }

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      columnSpacing={{ xs: 2 }}
    >
      <Item xs={2}>
        <Icon sx={{ width: '100%', height: '100%', color: 'error.main' }} />
      </Item>
      <Item xs={10}>
        <Typography component="h6" variant="h6">
          {dialogText}
        </Typography>
      </Item>
      <Item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>{dialogActions}</Box>
      </Item>
    </Container>
  );
}
