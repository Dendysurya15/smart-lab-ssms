import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <ColorModeScript />
     <Component {...pageProps} />
    </ChakraProvider>
  );
}
