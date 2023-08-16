import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';


import {
    FormControl,
    FormLabel,
    InputGroup ,
    Button,
    InputRightElement ,
    FormErrorMessage,
    FormHelperText,
    Image,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'
function Index() {
  const containerStyles = {
    height: '900px', // Set the desired height for the container
    display: 'flex',
    justifyContent: 'space-between',
    backgroundImage: 'linear-gradient(to right, green 50%, white 50%)', // Create the background gradient
    backgroundSize: '100% 100%',
    padding: '20px', // Adjust padding as needed
  };

  const boxStyles = {
    width: '48%',
    height: '100%',
    padding: '20px',
    color: 'white',
  };

  const rightContainer = {
    height: '900px',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center', // Center horizontally
    // justifyContent: 'center', // Center vertically
    paddingTop: '100px',
   
  
  };


  const [input, setInput] = useState('')
  const handleInputChange = (e) => setInput(e.target.value)
  const isError = input === ''
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)


  
  return (
    <div style={containerStyles}>
      <div style={boxStyles}>
        Left Box
      </div>

      <div style={boxStyles}>
          <div style={rightContainer}>


    <Image
    boxSize='200px'
    src='/Logo-SSS.png'
    alt='CBI'
    mx='auto' // Center horizontally by setting equal left and right margins
    display='flex'
    justifyContent='center'
    objectFit='contain' // Ensure the image fits within the boxSize
    />



          <h1 style={{ color: 'black' }}>Selamat Datang</h1>
          <p style={{ color: 'rgba(0, 0, 0, 0.5)', textAlign: '' }}>
          Silahkan melakukan Autentikasi terlebih dahulu
          </p>


        
            <FormControl isRequired>
            <FormLabel textColor="red">Username</FormLabel>
            <Input placeholder='Username' />
            {/* Password  */}  
            <FormLabel textColor={"red"}>Email</FormLabel>
            <InputGroup size='md'>
            <Input
                textColor="black"
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
                </InputGroup>
            </FormControl>

          <Button
            mt={4}
            colorScheme='teal'
           
            type='submit'
          >
            Submit
          </Button>
        </div>
      </div>


 </div>
  );
}

export default Index;
