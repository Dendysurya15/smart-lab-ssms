// ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parse } from 'cookie'; // Import the parse function

const checkAuthentication = () => {
  // Check if a user session exists by parsing cookies
  const cookies = parse(document.cookie);
  const session = cookies.session;

  return session !== undefined;
};

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check for authentication here based on your method (session or token)
    const authenticated = checkAuthentication(); // Use the checkAuthentication function
    if (!authenticated) {
      router.push('/'); // Redirect to your login page
    }
  }, []);

  return children;
};

export default ProtectedRoute;
