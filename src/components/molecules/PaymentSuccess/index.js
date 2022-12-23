import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@atoms/GridContainer';
import Item from '@components/atoms/GridItem';
import QRCode from 'react-qr-code';
import NextImage from 'next/image';
import { toPng } from 'html-to-image';

export default function PaymentSuccess() {
  const registrationId = sessionStorage.getItem('registrationId');
  const registerName = sessionStorage.getItem('registerName');

  const handleClick = () => {
    const svg = document.getElementById('QRCode');
    toPng(svg)
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
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
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
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
              <Box component={Paper} sx={{ p: 2, border: '5px solid #2b81be' }} id="QRCode">
                <Item>
                  <NextImage src="https://mhsosa.in/img/logo.png" width={108} height={106} alt="" />
                </Item>
                <Box sx={{ m: 2 }}>
                  <QRCode
                    // id="QRCode"
                    title="Entry Pass"
                    value={registrationId}
                  />
                </Box>
                <Item>
                  <Typography variant="h6" sx={{mb:1, fontWeight: 'bold'}}>{registerName}</Typography>
                  <Typography variant="h6" sx={{fontWeight: 'bold'}}>2nd Alumni Meet</Typography>
                  <Typography sx={{ fontWeight: 500 }}>8 Jan 2023, Sunday</Typography>
                  <Typography sx={{ fontWeight: 500 }}>5:00 PM Onwards</Typography>
                  <Typography sx={{ fontWeight: 500 }}>MHS School, Tilak Nagar, Jaipur</Typography>
                </Item>
              </Box>
            </Item>
            <Item>
              <Button onClick={handleClick}>Download Ticket</Button>
            </Item>
          </>
        )}
      </Container>
    </Box>
  );
}
