import { useState, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Layout from '../components/Layout';
import Router, { useRouter } from 'next/router';
import { ThemeProvider, ToastProvider, SSRProvider } from '@magiclabs/ui';
import '@magiclabs/ui/dist/cjs/index.css';
import {isMobile} from 'react-device-detect';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const router = useRouter();
  const [flag, setFlag] = useState();

  
  // if (isMobile) {
  //   const href = "www.google.com"
  //   router.push(href);
      
  // }
  
  // On each page load, check if user is logged in
  useEffect(() => {
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then(setUser);
      } else {
        if (router.pathname === '/about') {
          setFlag(1);
        }
        else if (router.pathname === '/tank') {
          setFlag(2);
        }
        else if (router.pathname === '/showcase') {
          setFlag(3);
        }
        else if (router.pathname === '/') {
          setFlag(3);
        }
        else if (router.pathname !== '/callback') {
          Router.push('/login');
          setUser();
        }
      }
    });
  }, []);

  if (flag == 1) {
    Router.push('/about');
  }
  else if (flag == 2) {
    Router.push('/about');
  }
  else if (flag == 3) {
    Router.push('/showcase');
  }

  return (
    <SSRProvider>
      <ThemeProvider root>
        <ToastProvider position="bottom">
          <UserContext.Provider value={[user, setUser]}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContext.Provider>
        </ToastProvider>
      </ThemeProvider>
    </SSRProvider>
  );
}

export default MyApp;
