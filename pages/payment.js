import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const PaymentInfo = dynamic(() => import('@molecules/PaymentInfo'), {
  ssr: false,
});

export default function PaymentInfoPlan(props) {
  return (
    <Layout label="Subscription">
      <PaymentInfo {...props} />
    </Layout>
  );
}
