import React from 'react';
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';

const QRVerification = dynamic(() => import('@pages/QRVerification'), {
  ssr: false,
});

export default function UserQR(props) {
  return (
    <Layout label="QR Code">
      <QRVerification {...props} />
    </Layout>
  );
}
