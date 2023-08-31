// components/SidebarLink.js
import React from 'react';
import { Box, Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

const SidebarLink = ({ icon, path, children }) => {
  return (
    <NextLink href={path} passHref>
      <Link
        as="a"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        w="100%"
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
          <Text>{children}</Text>
        </Flex>
      </Link>
    </NextLink>
  );
};

export default SidebarLink;
