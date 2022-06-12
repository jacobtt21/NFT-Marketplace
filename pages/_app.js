import { useState, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Layout from '../components/Layout';
import Router, { useRouter } from 'next/router';
import { ThemeProvider, ToastProvider, SSRProvider } from '@magiclabs/ui';
import '@magiclabs/ui/dist/cjs/index.css';
import { usePanelbear } from '@panelbear/panelbear-nextjs';
import { isMobile } from 'react-device-detect';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const router = useRouter();
  usePanelbear('JeX1D57Asdk');

  
  useEffect(() => {
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        if (isMobile) {
          Router.push("www.google.com");
        }
        magic.user.getMetadata().then(setUser);
      } else {
        if (router.pathname !== '/callback') {
          if (router.pathname === '/') {
            if (isMobile) {
              Router.push("www.google.com");
            }
            Router.push('/showcase');
          }
          else if (router.pathname === '/s/[id]') {
            if (isMobile) {
              Router.push("www.google.com");
            }
          }
          else if (router.pathname === '/u/[user]') {
            if (isMobile) {
              Router.push("www.google.com");
            }
          }
          else {
            if (isMobile) {
              Router.push("www.google.com");
            }
            Router.push('/login');
            setUser();
          }
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
