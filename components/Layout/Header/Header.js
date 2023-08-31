// components/Header.js
import React from 'react';
import { IconButton, Flex, HStack, Text, Menu, MenuButton, Avatar, Box, MenuList, MenuItem, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiMoon, FiSun, FiChevronDown } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const logOut = () => {
    Cookies.remove('loggedin');
    router.push('/');
  };

  return (
    <header>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
      >
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="toggle mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
          />
        </HStack>
        
        <HStack spacing="4">
          {/* Logo */}
          <Text fontSize="xl">Logo</Text>
          
          {/* User Profile */}
          <Menu>
            <MenuButton as={Avatar} size="sm" cursor="pointer">
              {/* Avatar image */}
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </header>
  );
};

export default Header;
