import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Message from '@atoms/Message';
import ErrorBoundary from '@atoms/ErrorBoundary';
import Loader from '@molecules/Loader';
import StateProvider from '../src/utils/redux';
import theme, { globalStyle } from '../src/theme';
import { useLoader } from '../src/services/hooks';

export default function MyApp(props) {
  useLoader();
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <title>Event App</title>
        <meta name="description" content="Alumni Event" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StateProvider>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={globalStyle} />
            <Loader />
            <Message />
            <Component {...pageProps} />
          </ThemeProvider>
        </ErrorBoundary>
      </StateProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
