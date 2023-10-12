import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Image,
  useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter 
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
  
import { useRouter } from 'next/router'; // Import the useRouter hook



const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // Add state for username
  const [password, setPassword] = useState(""); // Add state for password

  const handleShowClick = () => setShowPassword(!showPassword);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use Chakra UI's useDisclosure to manage the alert

  
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password ) {
      onOpen(); // Open the Chakra UI AlertDialog
      return;
    }
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (response.ok) {
        // Redirect to the dashboard page upon successful login
        router.push('/Dashboard/dashboard'); // Use the correct relative path
      } else {
         // Login failed
         const data = await response.json();
         onOpen(); // Open the Chakra UI AlertDialog
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <Flex
      flexDirection="row" // Display content in a row (horizontal)
      width="100wh"
      height="100vh"
      backgroundColor="white"
    >
      {/* Left Box (Empty Background) - Hide on mobile */}
      <Box
        flex="1" // Allow the left box to take up available space
        background={`linear-gradient(135deg, rgb(0, 128, 0), rgb(255, 255, 255))`} // Background gradient from RGB green to white
        borderTopRightRadius="200px" // Rounded top-left corner
        display={["none", "block"]} // Hide on mobile, show on other screen sizes
      ></Box>
    
      <Box
        flex="1" // Allow the right box to take up available space
        display="flex"
       
        alignItems="center" // Center content vertically
        justifyContent="center" // Center content horizontally
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
           <Image
            boxSize="150px"
            src="/Logo-SSS.png"
            alt="CBI"
            mx="auto"
            display="flex"
            objectFit="contain"
          />

          <Heading as="h1" size="lg" color="black" textAlign={["center", "left"]}>
            Selamat Datang Portal Smart Labs
          </Heading>
          <Heading as="h5" size="M" color="grey" textAlign={["center", "left"]}>
           Silahkan Login dengan memasukan email dan password anda
          </Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleLogin}> {/* Add onSubmit event handler */}
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update the username state
                    required // Make the input field required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update the password state
                    required // Make the input field required
                  />
                  <InputRightElement width="4.5rem">
                  <Button
                    borderRadius={0}
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={handleLogin} 
                  >
                    Login
                  </Button>

                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>

          <AlertDialog
        leastDestructiveRef={null}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Invalid Credentials</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            The username or password you entered is incorrect. Please try again.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='blue' onClick={onClose}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
         </Box>
        </Stack>
      </Box>
    </Flex>
  );


};

export default App;
