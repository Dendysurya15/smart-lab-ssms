import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  Image,
  Text,
  Icon 
} from '@chakra-ui/react';
import { ChevronDownIcon, MoonIcon, SunIcon, ChevronRightIcon,CopyIcon , FaMoon, FaSun  } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js'
import {user} from 'react-icons-kit/icomoon/user'

const DashboardLayout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
  };

  useEffect(() => {
    const handleResize = () => {
      // Automatically close the sidebar on small screens (less than 768px)
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Add a listener for window resize events
    window.addEventListener('resize', handleResize);

    // Initial check for screen size
    handleResize();

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  
  return (
    <div style={{ position: 'relative' }}>
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem',
        display: 'flex',
        borderBottom: '1px solid #ccc',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left Section */}
      <Image src="/your-logo.png" alt="Logo" h="40px" />
  
      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Color Mode Switch */}
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          colorScheme="yellow"
        />
  
        {/* Mobile Sidebar Toggle Button */}
        <IconButton
          aria-label="Toggle sidebar"
          icon={<ChevronRightIcon />}
          onClick={handleSidebarToggle}
          colorScheme="yellow"
          display={{ base: 'block', md: 'none' }} // Show only on mobile view
        />
  
        {/* User Profile Dropdown */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="User profile"
            icon={<CopyIcon />}
            onClick={handleMenuToggle}
            colorScheme="yellow"
          />
  
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  
            <aside
          style={{
            position: 'fixed',
            top: '72px',
            bottom: '32px',
            left: isSidebarOpen ? 0 : '-260px',
            width: '260px',
            borderRight: '1px solid #ccc',
            overflowY: 'auto',
            zIndex: 100,
            transition: 'left 0.3s ease',
            boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
            padding: '20px',
          }}
        >
          <Stack spacing={4}>
            {/* Sidebar Toggle Icon */}
            <IconButton
              aria-label="Toggle sidebar"
              icon={isSidebarOpen ? <MoonIcon /> : <SunIcon />}
              onClick={handleSidebarToggle}
              colorScheme="yellow"
              display={{ base: 'block', md: 'none' }}
              alignSelf="flex-end" // Align the icon to the bottom right corner
            />
            
            <Link href='/Dashboard/dashboard'  _hover={{ color: 'blue.500' }}>
              <Flex align="center">
                <Icon as={ChevronRightIcon} marginRight="2" />
                Dashboard
              </Flex>
            </Link>
            <Link href='/History/History'  _hover={{ color: 'blue.500' }}>
              <Flex align="center">
                <Icon as={ChevronRightIcon} marginRight="2" />
                History
              </Flex>
            </Link>
          </Stack>
        </aside>

          
    <main
      style={{
        marginLeft: isSidebarOpen ? '260px' : '0',
        marginTop: '60px',
        padding: '1rem',
        transition: 'margin-left 0.3s ease',
      }}
    >
      {children}
    </main>
  
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #ccc',
        zIndex: 1000,
        padding: '1rem',
      }}
    >
      {/* Footer content goes here */}
    </footer>
  </div>
  
  );
};

export default DashboardLayout;
