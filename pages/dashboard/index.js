import React from 'react'
import Navbar from '../../components/Layout/Navbar';
import withAuth from '../middleware/withAuth'; // Adjust the path based on your file structure
import { useEffect } from 'react';


function Dashboard() {
  // ... your existing code ...

  return (
    <div>
      <Navbar />
      <h1>Hallo</h1>
      {/* ... rest of your component's JSX ... */}
    </div>
  );
}

export default withAuth(Dashboard);