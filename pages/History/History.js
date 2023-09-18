console.error = (message) => {
  if (message.startsWith('Warning: React does not recognize')) {
    return;
  }
  console.warn(message);
};


import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import { format } from 'date-fns';
import { getFilteredData, updateData } from '../../pages/api/dataEMP';
import {
  useDisclosure,
  Box,
  useToast, // Import the useToast hook
  Input,
  Button,
  FormControl,
  FormLabel,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  HStack ,
  Flex,
  Icon 
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js'
import { DeleteIcon, EditIcon, WarningIcon, AddIcon } from '@chakra-ui/icons'
import DashboardLayout from '../../RootLayouts/DashboardLayout/dashboardLayout'; // Import your layout
import { SmallAddIcon} from '@chakra-ui/icons';


function History() {
  const [tanggal, setTanggal] = useState(new Date()); 
    const [est, setEst] = useState(''); // Set default to 'all' estates
    const [searchText, setSearchText] = useState('');
    const [apiResponse, setApiResponse] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState(null); // State to store the selected row for editing
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const toast = useToast(); // Initialize useToast hook


    useEffect(() => {
      async function fetchData() {
        try {
          let url = `/api/dataEMP?est=${est}`;
          
          if (tanggal) {
            const formattedDate = format(tanggal, 'yyyy-MM-dd');
            url += `&tanggal=${formattedDate}`;
          }
  
          const response = await fetch(url);
  
          if (!response.ok) {
            throw new Error('API request failed');
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setApiResponse(data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, [tanggal, est]);
  
    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Tanggal ', selector: row => row.tanggal_penerimaan, sortable: true },        
      { name: 'Jenis Sample',  selector: row => row.jenis_sample, sortable: true },
      { name: 'Asal Sample',  selector: row => row.asal_sampel, sortable: true },
      { name: 'Nomor Kupa',  selector: row => row.nomor_kupa, sortable: true },
      { name: 'Nama Pengirim',  selector: row => row.nama_pengirim, sortable: true },
      { name: 'Departemen',  selector: row => row.departemen, sortable: true },
      { name: 'Kode Sample',  selector: row => row.kode_sample, sortable: true },
      { name: 'Nomor Surat',  selector: row => row.nomor_surat, sortable: true },
      { name: 'Estimasi',  selector: row => row.estimasi, sortable: true },
      { name: 'Tujuan',  selector: row => row.tujuan, sortable: true },
      { name: 'Parameter',  selector: row => row.parameter_analisis, sortable: true },
      { name: 'Progress',  selector: row => row.progress, sortable: true },
      { name: 'Last Update',  selector: row => row.last_update, sortable: true },
      { name: 'No HP',  selector: row => row.no_hp, sortable: true },
      { name: 'Email',  selector: row => row.email, sortable: true },
      {
        name: 'Actions',
        cell: (row) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => handleEdit(row)}>
              <EditIcon />
            </button>
            <button onClick={() => handleDelete(row.id)}>
              <DeleteIcon />
            </button>
          </div>
        ),
        sortable: false,
      },
    ].map(col => ({
      ...col,
      minWidth: '150px', // Set a minimum width for the column
      cell: col.cell
        ? row => <div className="cell-text">{col.cell(row)}</div>
        : col.cell,
    }));
    // Custom filter function
    const customFilter = (rows, text) => {
      return rows.filter(row => {
        return Object.values(row).some(cell =>
          cell.toString().toLowerCase().includes(text.toLowerCase())
        );
      });
    };

  

    const handleDelete = (id) => {
        // Set the delete target ID and open the delete confirmation modal
        setDeleteTargetId(id);
        setDeleteAlertOpen(true);
    };
      
      
      const onDeleteConfirm = async () => {
        if (deleteTargetId) {
          try {
            const response = await fetch(`/api/dataEMP?id=${deleteTargetId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            console.log(response);
    
            if (response.ok) {
              console.log(`Row with ID ${deleteTargetId} deleted successfully`);
    
              // Remove the deleted row from the apiResponse state
              setApiResponse(apiResponse.filter(row => row.id !== deleteTargetId));

              toast({
                title: 'Delete Succes',
                description: 'Data berhasil di hapus.',
                status: 'success',
                position : 'top',
                duration: 3000,
                isClosable: true,
              });
            } else {
              console.error('Delete request failed');
            }
          } catch (error) {
            console.error('Error during delete request:', error);
          }
        }
    
        // Close the delete confirmation modal
        setDeleteAlertOpen(false);
      };
    
  
      const [progressOptions, setProgressOptions] = useState([]);

      const handleEdit = async (row) => {
        try {
          const idfilter = row.id; // Get the ID from the row
    
          const filteredData = await getFilteredData(idfilter);
    
          // Extract 'nama' values from filteredData and set them as progressOptions
          const namaOptions = filteredData.map((item) => item.nama);
          setProgressOptions(namaOptions);
    
          setSelectedRow(row);
          onOpen(); // Open the drawer when clicking "Edit"
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const handleSave = async () => {
    try {
      // Extract the necessary data (id and progress) from selectedRow
      const { id, progress } = selectedRow;

      // Perform the API call to update the progress
      const updateResponse = await updateData(id, progress);

      // console.log(updateResponse);
      if (updateResponse) {
        // Update the apiResponse state to reflect the updated progress
        setApiResponse((prevResponse) =>
          prevResponse.map((row) => (row.id === id ? { ...row, progress } : row))
        );

        // Show a toast notification for successful update
        toast({
          title: 'Upload Succes',
          description: 'Progress berhasil di update.',
          status: 'success',
          position : 'top',
          duration: 3000,
          isClosable: true,
        });

        // Close the drawer after saving
        onClose();
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while saving data.',
        status: 'error', // Set the status to 'error'
        duration: 3000,
        isClosable: true,
      });
    }
  };
    return (
        <DashboardLayout>
          <Box>
            
             <Box display="flex" gap={4} mb={4}>

            <FormControl>
                <FormLabel>Tanggal</FormLabel>
                <DatePicker
                selected={tanggal}
                onChange={date => setTanggal(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
              </FormControl>
              
              <FormControl>
                <FormLabel>Cari Jenis Pupuk</FormLabel>
                <Input
                  type="text"
                  placeholder="Cari Jenis Pupuk"
                  value={est}
                  onChange={e => setEst(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Cari Any KeyWord</FormLabel>
                <Input
                  type="text"
                  placeholder="Cari KeyWord..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
              </FormControl>
          </Box>

            <Link  href="/DataHistory/Upload"   _hover={{ color: 'blue.500' }}>
              <Flex align="center">
                <Icon as={SmallAddIcon} marginRight="2" />
                Tambah Data
              </Flex>
            </Link>


          <DataTable
          columns={columns}
                data={customFilter(apiResponse, searchText)}
                pagination
          />  

          <Drawer isOpen={isOpen} onClose={onClose} size={'xl'}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader className="modal-header">Update Progress</DrawerHeader>
                <DrawerBody pb={6}>
                {selectedRow && (
                <div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <FormControl>
                      <FormLabel>Jenis Sample</FormLabel>
                      <Input defaultValue={selectedRow.jenis_sample} disabled />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Asal Sample</FormLabel>
                      <Input defaultValue={selectedRow.asal_sampel} disabled />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Nomor Kupa</FormLabel>
                      <Input defaultValue={selectedRow.nomor_kupa} disabled />
                    </FormControl>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <FormControl>
                      <FormLabel>Departemen</FormLabel>
                      <Input defaultValue={selectedRow.departemen} disabled />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Progress</FormLabel>
                      <select
                        value={selectedRow.progress} // Use value instead of defaultValue
                        onChange={event => {
                          const newProgress = event.target.value;
                          setSelectedRow(prevRow => ({
                            ...prevRow,
                            progress: newProgress
                          }));
                        }}
                      >
                        {progressOptions.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Tujuan</FormLabel>
                      <Input defaultValue={selectedRow.tujuan} disabled />
                    </FormControl>
                  </div>
                </div>
              )}
                </DrawerBody>
                <DrawerFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSave}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </DrawerFooter>
              </DrawerContent>
          </Drawer>

          <AlertDialog
        isOpen={deleteAlertOpen}
        leastDestructiveRef={undefined}
        onClose={() => setDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this item?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setDeleteAlertOpen(false)}>Cancel</Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
          </AlertDialog>


          </Box>
        </DashboardLayout>
      );
  
}

export default History



