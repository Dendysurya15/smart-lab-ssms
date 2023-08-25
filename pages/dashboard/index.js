
import Navbar from '../../components/Layout/Navbar';
import withAuth from '../middleware/withAuth'; // Adjust the path based on your file structure
import { useEffect } from 'react';
import React, { useState } from 'react'; // Import useState
import { useRouter } from 'next/router';

const Dashboard = () => {
  
  return (
    
    <Navbar />
  );
};
export default withAuth(Dashboard);


