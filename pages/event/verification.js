import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const Scanner = dynamic(() => import('@molecules/Scanner'), {
  ssr: false,
});

export default function Verification(props) {
  return (
    <Layout label="Verification">
      <Scanner {...props} />
    </Layout>
  );
}
