import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { SignInProps } from './types';

function SignIn({ onChange, emailValue, passwordValue, onSubmit }: SignInProps) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  return (
    <Flex position="relative" bg="gray.100">
      <Flex
        h="100vh"
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ md: "0px" }}
      >
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Masuk
            </Text>

            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="email"
                  placeholder="Email"
                  mb="24px"
                  size="lg"
                  value={emailValue}
                  onChange={onChange}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  name="password"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="Password"
                  mb="24px"
                  size="lg"
                  value={passwordValue}
                  onChange={onChange}
                  isRequired
                />
              </FormControl>
              <Button
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                color="white"
                bg="blue.300"
                type="submit"
              >
                Masuk
              </Button>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Daftar pasien baru?
                <Link
                  color={titleColor}
                  as={RouteLink}
                  ms="5px"
                  to="/daftar"
                  fontWeight="bold"
                >
                  Daftar
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;