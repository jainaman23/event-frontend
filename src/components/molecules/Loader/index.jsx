import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import styles from './styles';

const Loader = ({ isLoading = false }) => {
  return (
    <Container>
      {isLoading && (
        <Item sx={styles.loaderWrapper}>
          <CircularProgress />
        </Item>
      )}
    </Container>
  );
};

export default Loader;
