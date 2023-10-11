import React, { useCallback, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import papaparse from 'papaparse';
import DashboardLayout from '../../RootLayouts/DashboardLayout/dashboardLayout';
import DataTable from 'react-data-table-component';

function Upload() {
  const [tableData, setTableData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([1, 2, 3,4,6,7,10,8,11,9,14,12]); // Example: Select columns 1, 3, and 7

  const customHeaders = {
    1: 'Tanggal',      
    2: 'Jenis Sample',   
    3: 'Asal Sample', 
    4: 'Nomor Kupa', 
    6: 'Nama Pengirim', 
    7: 'Nama Departemen', 
    10: 'Kode Sample', 
    8: 'Nomor Surat', 
    11: 'Estimasi', 
    9: 'Parameter', 
    14: 'Progress',    
    12: 'Tanggal Selesai', 
  };
  const mapToDatabaseColumns = {
    1: 'tanggal_penerimaan',
    2: 'jenis_sample',
    3: 'asal_sampel',
    4: 'nomor_kupa',
    6: 'nama_pengirim',
    7: 'departemen',
    10: 'kode_sample',
    8: 'nomor_surat',
    11: 'estimasi',
    9: 'parameter_analisis',
    14: 'progress',
    12: 'last_update',
  };
  const missingColumns = ['id', 'no_hp', 'email', 'foto_sample','tujuan',];

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    papaparse.parse(file, {
      header: false, // Set header to false to ignore the header
      dynamicTyping: true,
      complete: (result) => {
        const parsedData = result.data;
        // console.log(JSON.stringify(parsedData, null, 2));

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

  const handleSave = () => {
    if (tableData.length === 0) {
      console.log('No data to save.');
      return;
    }
  
    const sqlInsertStatement = generateSqlInsertStatement(tableData, selectedColumns, missingColumns);
  
    // Define the API endpoint URL
    const apiUrl = '/api/uploadapi'; // Adjust this URL to match your Next.js API route
  
    // Make a POST request to the API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sqlInsertStatement }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from API:', data);
        // Handle the API response here
      })
      .catch((error) => {
        console.error('Error sending data to API:', error);
        // Handle the error here
      });
  };
  

  const generateSqlInsertStatement = (jsonData, selectedColumns, missingColumns) => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      return '';
    }
  
    const table = 'track_sample';
    const insertValues = jsonData.map((row) => {
      const values = selectedColumns.map((colIndex) => {
        const mappedColumnName = mapToDatabaseColumns[colIndex];
        let value = row[colIndex];
  
        if (value !== null && (mappedColumnName === 'tanggal_penerimaan' || mappedColumnName === 'estimasi' || mappedColumnName === 'last_update')) {
          value = formatDate(value);
        }
  
        if (value === null) {
          return 'NULL';
        } else if (typeof value === 'number') {
          return value;
        } else if (typeof value === 'string') {
          return `'${value}'`;
        }
      });
  
      // Fill in missing columns with NULL
      missingColumns.forEach((columnName) => {
        values.push('NULL');
      });
  
      return `(${values.join(', ')})`;
    });

    const allColumns = [...selectedColumns.map((colIndex) => `\`${mapToDatabaseColumns[colIndex]}\``), ...missingColumns.map(columnName => `\`${columnName}\``)];

    const insertStatement = `INSERT INTO \`track_sample\` (${allColumns.join(', ')}) VALUES\n${insertValues.join(',\n')};`;

    return insertStatement;
  };
  
  const formatDate = (dateString) => {
    const parts = dateString.split('-');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const formattedDate = `20${year}-${getMonthNumber(month)}-${day} 00:00:00`;
    return formattedDate;
  };
  
  const getMonthNumber = (monthName) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return String(months.indexOf(monthName) + 1).padStart(2, '0');
  };
  

  return (
    <DashboardLayout>
      <Flex direction="column" gap={4} mb={4}>
       

        <Box {...getRootProps()} border="2px dashed" p={4} textAlign="center">
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the CSV file here...</Text>
          ) : (
            <Text>Drag and drop a CSV file here, or click to select one</Text>
          )}
          <Text>Accepted file format: .csv</Text>
        </Box>

        <Box>
          <button onClick={handleSave}>Save JSON</button>

          <DataTable
            columns={columns}
            data={tableData}
            pagination
            responsive
          />
        </Box>
      </Flex>
    </DashboardLayout>
  );
}


export default Upload;
