import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import DashboardLayout from '../../RootLayouts/DashboardLayout/dashboardLayout'; // Import your layout
import { Link } from '@chakra-ui/next-js';

function Upload() {
  const onDrop = (acceptedFiles) => {
    // Handle the dropped files (acceptedFiles) here
    // You can access the file details from acceptedFiles array
    // For example, you can check the file type, size, etc.
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.xlsx', // Specify the accepted file types (Excel files in this case)
  });

  return (
    <DashboardLayout>
      <Flex direction="column" gap={4} mb={4}>
        {/* Container for Table */}
        <Box>
          {/* Place your table component or content here */}
          <p>This is the table container.</p>
        </Box>

        {/* Container for Upload File */}
        <Box {...getRootProps()} border="2px dashed" p={4} textAlign="center">
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the Excel file here...</Text>
          ) : (
            <Text>Drag and drop an Excel file here, or click to select one</Text>
          )}
          <Text>Accepted file format: .xlsx</Text>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}

export default Upload;
