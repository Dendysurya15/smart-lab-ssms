import React from 'react';
import { Box, VStack, Icon, useColorModeValue, Collapse } from '@chakra-ui/react'; // Import Collapse from Chakra UI
import { FiHome, FiCompass, FiChevronDown } from 'react-icons/fi';
import SidebarLink from '../SidebarLink'; // Create SidebarLink component

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, path: '/' },
  {
    name: 'History Sample',
    icon: FiCompass,
    path: '/history',
    nestedLinks: [
      { name: 'Update', path: '/history/update' },
      { name: 'Check', path: '/history/proggres' },
    ],
  },
];

const Sidebar = () => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      {/* Sidebar content */}
      <VStack align="stretch" spacing="4" p="4">
        {LinkItems.map((link) => (
          <Box key={link.name} position="relative">
            <SidebarLink icon={link.icon} path={link.path}>
              {link.name}
            </SidebarLink>
            {link.nestedLinks && (
              <Collapse in={true} animateOpacity>
                <VStack align="stretch" spacing="2" pl="4">
                  {link.nestedLinks.map((nestedLink) => (
                    <SidebarLink key={nestedLink.name} path={nestedLink.path}>
                      {nestedLink.name}
                    </SidebarLink>
                  ))}
                </VStack>
              </Collapse>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
