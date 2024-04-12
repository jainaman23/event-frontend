import React from 'react';
import NextImage from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import QRCode from 'react-qr-code';

export default function EntryPass({ registrationId, registerName }) {
  return (
    <Box sx={{ position: 'relative' }} id="QRCode">
      <NextImage src="/mhsosa-ticket.jpg" width={400} height={700} alt="" />
      <Box
        sx={{
          position: 'absolute',
          bottom: 66,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Box component={Paper} sx={{ p: 1 }}>
          <QRCode title="Entry Pass" value={registrationId} size={180} />
        </Box>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#fff', fontSize: 24 }}>
          {registerName}
        </Typography>
      </Box>
    </Box>
  );
}
