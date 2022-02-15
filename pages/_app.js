import { useState, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Layout from '../components/Layout';
import Router, { useRouter } from 'next/router';
import { ThemeProvider, ToastProvider, SSRProvider } from '@magiclabs/ui';
import '@magiclabs/ui/dist/cjs/index.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const router = useRouter();

  // On each page load, check if user is logged in
  useEffect(() => {
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then(setUser);
      } else {
        if (router.pathname !== '/callback') {
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
