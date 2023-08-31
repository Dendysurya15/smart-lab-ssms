import React from 'react'
import Layout from '../../components/Layout/Layout';

import withAuth from '../middleware/withAuth';

function update() {
  return (
    <Layout>
    <main>
      {/* Your specific content for the dashboard page */}
      <h1>Update</h1>
      {/* Add more content components as needed */}
    </main>
  </Layout>
  )
}

export default withAuth(update);
