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
    if(!router.isReady) {
      return;
    }
    if (isMobile) {
      window.location.href = "https://you.oustro.xyz" + router.asPath;
    }
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then(setUser);
        if (router.pathname === '/login') {
          Router.push('/');
        }
        else if (router.pathname === '/s/[id]') {
          Router.push('/'+router.query.id);
        }
        else if (router.pathname === '/showcase') {
          Router.push('/');
        }
      } else {
        if (router.pathname !== '/callback') {
          if (router.pathname === '/') {
            Router.push('/showcase');
          }
          else if (router.pathname === '/showcase') {
            
          }
          else if (router.pathname === '/preview') {
            
          }
          else if (router.pathname === '/faq') {
            
          }
          else if (router.pathname === '/about') {
            
          }
          else if (router.pathname === '/s/[id]') {
            
          }
          else if (router.pathname === '/u/[user]') {
            
          }
          else if (router.pathname === '/community/[cname]') {
            
          }
          else if (router.pathname === '/code') {
            
          }
          else if (router.pathname === '/sustainability') {
            
          }
          else if (router.pathname === '/legal') {
            
          }
          else if (router.pathname === '/contact') {
            router.push('/login?id=contact')
          }
          else {
            Router.push('/login');
            setUser();
          }
        }
      }
    });
  }, [router.isReady]);

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
