import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const RegistartionForm = dynamic(() => import('@components/organisms/RegistrationForm'), {
  ssr: false,
});

export default function Registration(props) {
  return (
    <Layout label={'Registration for MHS 2nd Alumni Meet on 08 Jan 2023, Sunday'}>
      <RegistartionForm {...props} />
    </Layout>
  );
}
