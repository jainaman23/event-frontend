import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const LoginForm = dynamic(() => import('@molecules/LoginForm'), {
  ssr: false,
});

export default function Registration(props) {
  return (
    <Layout label="Login">
      <LoginForm {...props} />
    </Layout>
  );
}
