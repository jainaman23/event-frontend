import React from 'react';
import Container from '@components/atoms/GridContainer';
import Item from '@components/atoms/GridItem';
import Image from 'next/image';

const text = 'Are you sure you want to permanently remove this item?';
const label = 'Subscribe';

export default function RegistrationClosed(props) {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      columnSpacing={{ xs: 2 }}
    >
      <Item xs={12}>
        <Image src="/closed.png" width={500} height={150} alt="" />
      </Item>
      {/* <Item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>{dialogActions}</Box>
      </Item> */}
    </Container>
  );
}
