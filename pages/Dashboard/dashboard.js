import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import DashboardLayout from '../../RootLayouts/DashboardLayout/dashboardLayout'; // Import your layout

const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* Page-specific content goes here */}
      <Box>
        <Text fontSize="xl">Welcome to your dashboard!</Text>
        {/* Add your dashboard content here */}
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
