import { useEffect, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Loading from '../components/Loading';
import Router from 'next/router';

export default function Callback() {
  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    // Grab user data returned from Twitter & Magic
    magic.oauth.getRedirectResult().then((result) => {
      console.log(result);
      const didToken = result.magic.idToken;

      // Validate auth token with server
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      }).then((res) => {
        if (res.status === 200) {
          magic.user.getMetadata().then(setUser);
          Router.push('/');
        }
      });
    });
  }, []);

  return <Loading />;
}
