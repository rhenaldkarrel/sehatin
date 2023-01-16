import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useColorModeValue,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { RegisterProps } from "./types";

const Register = ({
  nameValue,
  genderValue,
  birthplaceValue,
  birthdayValue,
  phoneValue,
  emailValue,
  passValue,
  secondPassValue,
  onChange,
  onSubmit
}: RegisterProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");

  return (
    <Flex position="relative" bg="gray.100">
      <Flex
        h="auto"
        p="24px"
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
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
              Daftar
            </Text>
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Nama
                </FormLabel>
                <Input
                  id="name"
                  name="name"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="Nama lengkap"
                  mb="24px"
                  size="lg"
                  onChange={onChange}
                  value={nameValue}
                />
              </FormControl>

              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Jenis Kelamin
                </FormLabel>
                <RadioGroup id="gender" value={genderValue}>
                  <Stack direction="row">
                    <Radio value="Laki-laki" onChange={onChange} name="gender">Laki-laki</Radio>
                    <Radio value="Perempuan" onChange={onChange} name="gender">Perempuan</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel ms="4px" fontSize="sm" mt="24px" fontWeight="normal">
                  Tempat Lahir
                </FormLabel>
                <Input
                  id="birthplace"
                  name="birthplace"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="Tempat lahir"
                  mb="24px"
                  size="lg"
                  onChange={onChange}
                  value={birthplaceValue}
                />
              </FormControl>

              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Tanggal Lahir
                </FormLabel>
                <Input
                  id='birthday'
                  name="birthday"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="date"
                  placeholder="Tempat lahir"
                  mb="24px"
                  size="lg"
                  onChange={onChange}
                  value={birthdayValue}
                />
              </FormControl>

              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Nomor Telepon
                </FormLabel>
                <Input
                  id="phone"
                  name="phone"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="number"
                  placeholder="Nomor telepon"
                  mb="24px"
                  size="lg"
                  onChange={onChange}
                  value={phoneValue}
                />
              </FormControl>

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
                  onChange={onChange}
                  value={emailValue}
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
                  onChange={onChange}
                  value={passValue}
                />
              </FormControl>

              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Konfirmasi password
                </FormLabel>
                <Input
                  id="password2"
                  name="password2"
                  variant="outline"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="Konfirmasi password"
                  mb="24px"
                  size="lg"
                  onChange={onChange}
                  value={secondPassValue}
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
                Daftar
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
                Sudah punya akun?
                <Link
                  color={titleColor}
                  as={RouteLink}
                  ms="5px"
                  to="/"
                  fontWeight="bold"
                >
                  Masuk
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Register;
