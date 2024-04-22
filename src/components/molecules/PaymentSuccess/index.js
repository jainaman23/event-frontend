import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@atoms/GridContainer';
import Item from '@components/atoms/GridItem';
import { toPng } from 'html-to-image';
import EntryPass from '../EntryPass';

export default function PaymentSuccess() {
  const registrationId = sessionStorage.getItem('registrationId');
  const registerName = sessionStorage.getItem('registerName');
  const registerType = sessionStorage.getItem('registerType');

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

  const handleClose = () => {
    window.location.href = '/registration';
  };

  if (registerType === 'NEW_MEMBER') {
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              MHSOSA लाइफटाइम मेंबर बनने के लिए धन्यवाद!
            </Typography>
            <Typography variant="h6">
              MHSOSA द्वारा आगामी कार्यक्रम की जानकारी आपको दी जाएगी।
            </Typography>
          </Item>
          <Item>
            <Button onClick={handleClose}>Close</Button>
          </Item>
        </Container>
      </Box>
    );
  }

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
              <EntryPass registerName={registerName} registrationId={registrationId} />
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
