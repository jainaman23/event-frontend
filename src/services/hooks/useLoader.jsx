import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import LoaderPortal from '@molecules/Loader';

function AppWithCallbackAfterRender({ status, setLoading }) {
  useEffect(() => {
    setLoading(status);
  });

  return <LoaderPortal isLoading={status} />;
}

let container = null;
const useLoader = () => {
  const [isLoading, setLoading] = useState(true);
  const [root, setRoot] = useState(null);

  useEffect(() => {
    if (!container) {
      container = document.getElementById('__loader');
      setRoot(ReactDOM.createRoot(container));
    }
  }, []);

  const setLoader = useCallback(
    (status) => {
      if (root) {
        root?.render(<AppWithCallbackAfterRender status={status} setLoading={setLoading} />);
      }
    },
    [root],
  );

  useEffect(() => {
    document.addEventListener('siteLoader', (e) => {
      setLoader(e.detail.status);
    });

    return () => {
      document.removeEventListener('siteLoader', (e) => {
        setLoader(false);
      });
    };
  });

  return [isLoading, setLoader];
};

export default useLoader;
