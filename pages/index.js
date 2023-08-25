import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import Cookies from 'js-cookie';
import {
    FormControl,
    FormLabel,
    InputGroup ,
    Button,
    InputRightElement ,
    Image,
    Alert,
    AlertIcon,
    AlertDescription,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'
  import { useEffect } from 'react';



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


  
  const [username, setUsername] = useState(''); // Added username state
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [error, setError] = useState(''); // State to hold the error message

  useEffect(() => {
    const isLoggedIn = Cookies.get('loggedin');

    // Redirect to dashboard if user is logged in and tries to access the login page
    if (isLoggedIn) {
      router.replace('/dashboard'); // Use router.replace instead of router.push
    }
  }, []); // Run the effect only on mount

  const handleLogin = async (event) => {
    event.preventDefault();
    

  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
  
      if (response.ok) {
        Cookies.set("loggedin", true);
        router.push("/dashboard");
      } else {
        // Login failed
        const data = await response.json();
        setError(data.message); // Set the error message in state
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div style={containerStyles}>
      <div style={boxStyles}>
      
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
          <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            Silahkan melakukan Autentikasi terlebih dahulu
          </p>

   
          <FormControl isRequired>
            <FormLabel textColor="red">Username</FormLabel>
            <Input
              textColor="black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
            />

            <FormLabel textColor="red">Email</FormLabel>
            <Input
              textColor="black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />

            <FormLabel textColor="red">Password</FormLabel>
            <InputGroup size="md">
              <Input
                textColor="black"
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button mt={4} colorScheme="teal" onClick={handleLogin}>
              Submit
            </Button>
            {error && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                <AlertDescription textColor="red">{error}</AlertDescription>
              </Alert>
            )}
          </FormControl>
        </div>
      </div>


 </div>
  );
}

export default Index;
