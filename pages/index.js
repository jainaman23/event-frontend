import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const RegistartionForm = dynamic(() => import('@molecules/RegistrationForm'), {
  ssr: false,
});

export default function Registration(props) {
  return (
    <Layout label="Registration">
      <RegistartionForm {...props} />
    </Layout>
  );
}
