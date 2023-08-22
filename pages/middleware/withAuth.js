import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const isLoggedIn = Cookies.get('loggedin');
    const isLoginPage = router.pathname === '/';

    useEffect(() => {
      if (!isLoggedIn && !isLoginPage) {
        router.push('/');
      }
    }, [isLoggedIn, isLoginPage]);

    if (!isLoggedIn && !isLoginPage) {
      if (typeof window !== 'undefined') {
        router.push('/');
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
