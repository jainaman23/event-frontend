import React from 'react';
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';

const PaymentSuccess = dynamic(() => import('@molecules/PaymentSuccess'), {
  ssr: false,
});

export default function UserQR(props) {
  return (
    <Layout label="Thank you, your payment successfully completed">
      <PaymentSuccess {...props} />
    </Layout>
  );
}
