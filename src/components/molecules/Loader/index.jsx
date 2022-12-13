import React from 'react';
import Image from 'next/image';
import Container from '@atoms/GridContainer';
import Item from '@atoms/GridItem';
import { IMAGES } from '../../../constants';
import styles from './styles';

const Loader = ({ isLoading = false }) => {
  return (
    <Container>
      {isLoading && (
        <Item sx={styles.loaderWrapper}>
          <Image
            loader={({ src }) => src}
            src={IMAGES.LOADER}
            width={70}
            height={70}
            alt="loading"
            unoptimized
          />
        </Item>
      )}
    </Container>
  );
};

export default Loader;
