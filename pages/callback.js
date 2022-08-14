import { useEffect, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Loading from '../components/Loading';
import Router, { useRouter } from 'next/router';

export default function Callback() {
  const [, setUser] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!router.query) {
      return;
    }
    finishEmailRedirectLogin();
  }, [router.query]);

  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential)
      magic.auth.loginWithCredential().then((didToken) => authenticateWithServer(didToken));
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken) => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });

    if (res.status === 200) {
      // Set the UserContext to the now logged in user
      let userMetadata = await magic.user.getMetadata();
      await setUser(userMetadata);
      Router.push('/');
    }
  };

  return (
    <> 
      <Loading />
      <h1>Please wait while you get you set up...</h1>
      <style jsx>{`
        h1 {
          text-align: center;
          margin-top: 35px;
          font-size: 30px;
        }
      `}</style>
    </>
  );
}
