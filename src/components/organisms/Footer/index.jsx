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
        <Container sx={{ height: '56px', alignItems: 'center', px: 6 }}>
          <Typography>© All rights reserved.</Typography>
        </Container>
      </Item>
    </Container>
  );
};

export default Footer;
