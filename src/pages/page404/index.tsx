import { Flex, Heading, Text, Button } from "@chakra-ui/react";

const PageNotFound = () => (
  <>
    <Flex
      h="100vh"
      w="100vw"
      bg="blue.300"
      px="32px"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="column" textAlign="center" color="white" h="25%">
        <Heading>404: Not Found</Heading>
        <Text fontSize="xl" my="5">
          Halaman tidak ditemukan
        </Text>
        <a href="/">
          <Button color="blue.300">Kembali</Button>
        </a>
      </Flex>
    </Flex>
  </>
);

export default PageNotFound;
