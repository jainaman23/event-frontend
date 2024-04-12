import React from 'react';
import Divider from '@mui/material/Divider';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{ bottom: 0, zIndex: (theme) => theme.zIndex.drawer + 2, position: 'relative' }}
    >
      <Item xs={12} sx={{ background: 'white' }}>
        <Divider />
        <Container
          sx={{
            height: '56px',
            alignItems: 'center',
            px: 6,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Copyright © 2024 MHSOSA. All rights reserved.</Typography>
          <Typography>
            <a href="https://lata.tech" target="_blank" class="" rel="noreferrer">
              Powered By Lata.tech
            </a>
          </Typography>
        </Container>
      </Item>
    </Container>
  );
};

export default Footer;
