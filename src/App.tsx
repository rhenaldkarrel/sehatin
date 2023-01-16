// import React from 'react';
import Routers from 'routers';
import { ChakraProvider } from '@chakra-ui/react';
import {AuthProvider} from 'context/AuthProvider';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
