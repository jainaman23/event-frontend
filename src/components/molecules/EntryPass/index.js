import React from 'react';
import NextImage from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import QRCode from 'react-qr-code';
import Item from '@components/atoms/GridItem';

export default function EntryPass({ registrationId, registerName }) {
  return (
    <Box component={Paper} sx={{ p: 2, border: '5px solid #2b81be' }} id="QRCode">
      <Item>
        <NextImage src="https://mhsosa.in/img/logo.png" width={108} height={106} alt="" />
      </Item>
      <Box sx={{ m: 2 }}>
        <QRCode title="Entry Pass" value={registrationId} />
      </Box>
      <Item>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          {registerName}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          2nd Alumni Meet
        </Typography>
        <Typography sx={{ fontWeight: 500 }}>8 Jan 2023, Sunday</Typography>
        <Typography sx={{ fontWeight: 500 }}>5:00 PM Onwards</Typography>
        <Typography sx={{ fontWeight: 500 }}>MHS School, Tilak Nagar, Jaipur</Typography>
      </Item>
    </Box>
  );
}
