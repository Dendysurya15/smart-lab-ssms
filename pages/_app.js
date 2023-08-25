import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Modal from 'react-modal'; // Import Modal from react-modal

Modal.setAppElement('#__next'); // Set the app element (assuming #__next is the root element)

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
       