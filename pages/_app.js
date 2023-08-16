import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from '../components/Login'; // Import the login page

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <LoginPage /> {/* Render the login page */}
    </ChakraProvider>
  );
}
