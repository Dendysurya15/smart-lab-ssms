// components/Content.js
import React from 'react';
import { Box } from '@chakra-ui/react'; // Import any styling components you use

const Content = ({ children }) => {
  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      {children}
    </Box>
  );
};

export default Content;
