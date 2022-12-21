import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@atoms/GridContainer';
import Item from '@components/atoms/GridItem';
import QRCode from 'react-qr-code';
import NextImage from 'next/image';

export default function PaymentSuccess() {
  const registrationId = sessionStorage.getItem('registrationId');

  const handleClick = () => {
    const svg = document.getElementById('QRCode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'entry-pass';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Container rowSpacing={{ xs: 2 }} flexDirection="column" alignItems="center">
        <Item>
          <NextImage src="https://mhsosa.in/img/logo.png" width={100} height={100} alt="" />
        </Item>
        <Item>
          <Typography variant="h2">Thankyou</Typography>
        </Item>
        <Item>
          <Typography>Thank you your payment successfully complete.</Typography>
        </Item>
        <Item>
          <Typography>
            {
              // eslint-disable-next-line quotes
              "Download your entry QR code and don't share it to anyone. It will work only for single entry."
            }
          </Typography>
        </Item>
        {registrationId && (
          <>
            <Item>
              <QRCode id="QRCode" title="Entry Pass" value={registrationId} />
            </Item>
            <Item>
              <Button onClick={handleClick}>Download</Button>
            </Item>
          </>
        )}
      </Container>
    </Box>
  );
}
