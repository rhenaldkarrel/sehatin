import {
  IconButton,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Avatar
} from '@chakra-ui/react';
import useAuth from 'hooks/useAuth';
import { Link } from 'react-router-dom';

import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import MobileProps from './types';

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const role = auth.role.charAt(0).toUpperCase() + auth.role.slice(1);

  const handleSignOut = () => {
    setAuth({accessToken: "", name: "", role: "", email: "", id: 0});
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Sehatin
      </Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'>
                  <Text fontSize='sm'>{auth.name}</Text>
                  <Text fontSize='xs' color='gray.600'>
                    {role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem as={Link} to='/edit-profile'>Ubah Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut} color='red'>Keluar</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;