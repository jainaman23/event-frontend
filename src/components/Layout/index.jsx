import React, { useEffect, useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Header from '@organisms/Header';
import Footer from '@organisms/Footer';

function Layout({ children, hideFooter = false, ...props }) {
  const [clientSide, setClientSide] = useState(false);

  function HideScroll({ children, clientSide }) {
    const trigger = useScrollTrigger({
      target: clientSide ? document.querySelector('main') : undefined,
    });
    return trigger ? null : children;
  }

  useEffect(() => {
    if (!hideFooter) {
      setClientSide(true);
    }
  }, [hideFooter]);

  return (
    <>
      <Header {...props} sx={{ mb: 2 }}>
        {children}
      </Header>
      {!hideFooter && (
        <HideScroll clientSide={clientSide} {...props}>
          <Footer />
        </HideScroll>
      )}
    </>
  );
}

export default Layout;
