import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const Dashboard = dynamic(() => import('@molecules/Dashboard'), {
  ssr: false,
});

function Interviews(props) {
  return (
    <Layout label="Dashboard">
      <Dashboard {...props} />
    </Layout>
  );
}

export default Interviews;
