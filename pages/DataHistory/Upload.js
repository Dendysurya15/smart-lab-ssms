import React, { useCallback, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import papaparse from 'papaparse';
import DashboardLayout from '../../RootLayouts/DashboardLayout/dashboardLayout';
import { Link } from '@chakra-ui/next-js';
import DataTable from 'react-data-table-component';

function Upload() {
  const [csvData, setCsvData] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    papaparse.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const parsedData = result.data;
        setCsvData(parsedData);

        // console.log(parsedData);
      },
      error: (error) => {
        console.error('CSV parsing error:', error.message);
      },
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.csv',
  });
console.log(csvData);
  const columns = csvData.length > 0 ? Object.keys(csvData[0]).map((header) => ({
    name: header,
    selector: (row) => row[header],
  })) : [];

  return (
    <DashboardLayout>
      <Flex direction="column" gap={4} mb={4}>
        <Box>
          <DataTable
            columns={columns}
            data={csvData}
            pagination
            responsive
          />
        </Box>

        <Box {...getRootProps()} border="2px dashed" p={4} textAlign="center">
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the CSV file here...</Text>
          ) : (
            <Text>Drag and drop a CSV file here, or click to select one</Text>
          )}
          <Text>Accepted file format: .csv</Text>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}

export default Upload;
