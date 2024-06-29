import React from 'react';
import NextImage from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import QRCode from 'react-qr-code';
import Item from '@components/atoms/GridItem';

export default function EntryPass({ registrationId, registerName }) {
  return (
    <Box
      component={Paper}
      sx={{ p: 0, border: '1px solid #FFF', marginBottom: '-5px' }}
      id="QRCode"
    >
      <Item sx={{ position: 'relative' }}>
        <NextImage src="/bg-srajan.jpg" width={480} height={807} alt="" />

        <Item
          sx={{
            position: 'absolute',
            bottom: '86px',
            width: '230px',
            left: 0,
            right: 0,
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              width: '100%',
              svg: { width: '100%', height: 'auto', border: '10px solid #fff' },
            }}
          >
            <QRCode title="Entry Pass" value={registrationId} />
          </Box>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#FFF' }}>
            {registerName}
          </Typography>
        </Item>
      </Item>
    </Box>
  );
}
