import React, { useCallback, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import papaparse from 'papaparse';
import DashboardLayout from '../../RootLayouts/DashboardLayout/dashboardLayout';
import DataTable from 'react-data-table-component';

function Upload() {
  const [tableData, setTableData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([1, 2, 3,4,7,8,11,9,12,10,15]); // Example: Select columns 1, 3, and 7

  // Define a mapping between column indices and custom headers
  const customHeaders = {
    1: 'Tanggal',      
    2: 'Jenis Sample',   
    3: 'Asal Sample', 
    4: 'Nomor Kupa', 
    7: 'Nama Pengirim', 
    8: 'Nomor Surat', 
    11: 'Estimasi', 
    9: 'Parameter', 
    12: 'Tanggal Selesai', 
    10: 'Kode Sample', 
    15: 'Progress',    
  };
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    papaparse.parse(file, {
      header: false, // Set header to false to ignore the header
      dynamicTyping: true,
      complete: (result) => {
        const parsedData = result.data;
        console.log(JSON.stringify(parsedData, null, 2));

        // Filter out rows that start with null values
        const filteredData = parsedData.filter((row) => {
          return row[0] !== null && row[1] !== null; 
        });

        // Update the state with the filtered data starting from index 6
        setTableData(filteredData.slice(1)); // Slice starting from index 6 to the end
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


  const columns = selectedColumns.map((colIndex) => ({
    name: customHeaders[colIndex] || `Column ${colIndex + 1}`, // Use custom header if defined, otherwise use default
    selector: (row) => row[colIndex] || '', // Handle null values
  }));
  return (
    <DashboardLayout>
      <Flex direction="column" gap={4} mb={4}>
        <Box>
          <DataTable
            columns={columns}
            data={tableData}
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
