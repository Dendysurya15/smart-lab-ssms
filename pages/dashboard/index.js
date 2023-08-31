// pages/Dashboard.js
import withAuth from '../middleware/withAuth';
import React from 'react';
import Layout from '../../components/Layout/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <main>
        {/* Your specific content for the dashboard page */}
        <h1>Dashboard Content</h1>
        {/* Add more content components as needed */}
      </main>
    </Layout>
  );
};

export default withAuth(Dashboard);
