import { Tr, Th } from '@chakra-ui/react';

const Headers = ({ headers }: { headers: string[] }) => {
  return (
    <Tr>
      {headers.map((header, index) => (
        <Th key={index}>{header}</Th>
      ))}
    </Tr>
  );
};

export default Headers;
