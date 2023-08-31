// pages/Dashboard.js
import withAuth from '../middleware/withAuth';
import React from 'react';
import Layout from '../../components/Layout/Layout';

const Historysample = () => {
  return (
    <Layout>
      <main>
        {/* Your specific content for the Historysample page */}
        <h1>Historysample Content</h1>
        {/* Add more content components as needed */}
      </main>
    </Layout>
  );
};

export default withAuth(Historysample);
