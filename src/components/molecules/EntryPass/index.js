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
        <NextImage src="/srajan-2024.jpeg" width={484} height={819} alt="" />

        <Item
          sx={{ position: 'absolute', bottom: '45px', width: '254px', left: '115px', right: 0 }}
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
