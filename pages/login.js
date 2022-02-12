import { useCallback, useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Router from 'next/router';
import { TextField, CallToAction } from '@magiclabs/ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [, setUser] = useContext(UserContext);

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      // Grab auth token after user clicks magic link in email
      const didToken = await magic.auth.loginWithMagicLink({ email });

      // Validate auth token with server
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      if (res.status === 200) {
        setUser(await magic.user.getMetadata());
        Router.push('/');
      }
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  const handleInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const loginWithTwitter = async () => {
    await magic.oauth.loginWithRedirect({
      provider: 'twitter',
      redirectURI: `${window.location.origin}/callback`,
    });
  };

  return (
    <div className="login-container">
      <h1>Sign up / Log in</h1>
      <TextField
        type="email"
        name="email"
        required="required"
        placeholder="Enter your email"
        onChange={handleInputOnChange}
        disabled={isLoggingIn}
      />
      <CallToAction
        color="primary"
        size="sm"
        onClick={login}
        disabled={isLoggingIn}
      >
        Send Magic Link
      </CallToAction>
      <div className="or-login-with">Or Log in With</div>
      <div onClick={loginWithTwitter}>
        <img src="/twitter.png" height={45} className="twitter-img" />
      </div>
      <style>{`
        h1 {
          font-size: 20px;
          font-weight: bold;
        }
        .login-container {
          width: 280px;
          height: 280px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #f9f9f9;
          box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }

        .twitter-img {
          border-radius: 50%;
          border: 1px solid #fbfbfb;
          cursor: pointer;
        }

        .twitter-img:hover {
          box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 16px;
        }

        .or-login-with {
          color: gray;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
