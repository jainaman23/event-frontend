import React from 'react';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import Typography from '@mui/material/Typography';
import QRCode from 'react-qr-code';

const QRVerification = (props) => {
  return (
    <Container>
      <Item xs={12} sx={{ background: 'white' }}>
        <QRCode value={`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`} />
      </Item>
    </Container>
  );
};

export default QRVerification;
