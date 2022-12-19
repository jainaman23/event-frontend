import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@atoms/GridContainer';
import Item from '@components/atoms/GridItem';

export default function EntryPass() {
  const handleClick = () => window.location.reload();
  return (
    <Box>
      <Container rowSpacing={{ xs: 2 }}>
        <Item>
          <Typography>
            Entry pass has been sent to your registered email id. Please check youe mail to download
            the entry pass
          </Typography>
        </Item>
        <Item>
          <Button onClick={handleClick}>Ok</Button>
        </Item>
      </Container>
    </Box>
  );
}
