import { useCallback, useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Router from 'next/router';
import { Icon, MonochromeIcons, TextField, CallToAction, Input } from '@magiclabs/ui';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
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

  return (
    <>
    <div className='landing'>
    <h1>Welcome to Oustro, we're excited to have you!</h1>
      <div className="login-container">
        <br />
        <TextField
          type="email"
          name="email"
          label="Enter your email address"
          placeholder='you@example.com'
          required="required"
          onChange={handleInputOnChange}
          disabled={isLoggingIn}
        />
        <br />
        <CallToAction
          color="primary"
          size="sm"
          onClick={login}
          disabled={isLoggingIn}
        >
        Let's Go!
        </CallToAction>
        <br />
        <style>{`
          h1 {
            font-size: 45px;
            margin: 70px;
          }
          .login-container {
            width: 380px;
            margin: 0 auto;
            border-radius: 30px;
            border: 1px solid #f9f9f9;
            box-shadow: rgba(0, 0, 0, 0.10) 0px 0px 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
          }
        `}</style>
      </div>
      <div className='footer'>
        <p>2023 Oustro Inc. v1.0.0-beta</p>
      </div>
      <style jsx>{`
        .landing {
          text-align:center;
          font-size:50px
        }

        .footer {
          padding:15px;
          border-top:1px solid #f0f0f0;
          margin:240px auto 10px;
          text-align:center;
          font-size:15px
        }
      `}</style>
    </div>
    </>
  );
}
