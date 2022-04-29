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
  if (isMobile) {
    return (
      <>
        <div className='name'>
          <h1>We're not Mobile ready yet, but we will be soon!</h1>
        </div>
        <style jsx>{`
          .name {
            text-align: center;
          }
        `}</style>
      </>
    )
  }
  
  // On each page load, check if user is logged in
  useEffect(() => {
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then(setUser);
      } else {
        if (router.pathname === '/about') {
          Router.push('/about');
        }
        else if (router.pathname === '/showcase') {
          Router.push('/showcase');
        }
        else if (router.pathname === '/') {
          Router.push('/showcase');
        }
        else if (router.pathname !== '/callback') {
          Router.push('/login');
          setUser();
        }
      }
    });
  }, []);

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
