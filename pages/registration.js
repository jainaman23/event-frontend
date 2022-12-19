import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const RegistartionForm = dynamic(() => import('@components/organisms/RegistrationForm'), {
  ssr: false,
});

export default function Registration(props) {
  return (
    <Layout label="Registration">
      <RegistartionForm {...props} />
    </Layout>
  );
}
