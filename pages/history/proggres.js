
import withAuth from '../middleware/withAuth';
import React from 'react';
import Layout from '../../components/Layout/Layout';


function proggres() {
  return (
      <Layout>
      <main>
        {/* Your specific content for the dashboard page */}
        <h1>History Progrres</h1>
        {/* Add more content components as needed */}
      </main>
    </Layout>

  )
}

export default withAuth(proggres);
