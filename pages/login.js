import { useCallback, useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Router from 'next/router';
import { Icon, MonochromeIcons, TextField, CallToAction, Input } from '@magiclabs/ui';
import Typical from 'react-typical'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";

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

  return (
    <>
    <div className='landing'>
      <Link href="/about">
        <img src='/oustro_logo.svg' className='logo' />
      </Link>
      <div className="login-container">
        <TextField
          type="email"
          name="email"
          placeholder='you@example.com'
          required="required"
          onChange={handleInputOnChange}
          disabled={isLoggingIn}
        />
        <CallToAction
          color="primary"
          size="sm"
          onClick={login}
          disabled={isLoggingIn}
        >
        Let's Go!
        </CallToAction>
        <style>{`
          h1 {
            font-size: 20px;
            font-weight: bold;
          }
          .login-container {
            width: 280px;
            height: 170px;
            margin: 0 auto;
            border-radius: 30px;
            border: 1px solid #f9f9f9;
            box-shadow: rgba(0, 0, 0, 0.10) 0px 0px 16px;
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
      <div className='Imagine'>
        <Typical steps={['Imagine what you could do...', 1000,]} wrapper="p"/>
        <div className='example'>
        <Link href="/about">
          <CallToAction
          
          >
            Learn more about Oustro here
          </CallToAction>
        </Link>
        </div>
      </div>
      <div className='footer'>
        <p>2023 Oustro Inc.</p>
      </div>
      <style jsx>{`
        .Imagine {margin:80px auto 10px;}.example{margin:80px auto 10px;width: 900px; height: 200px;}.landing{text-align:center;font-size:60px}.logo{max-width:90rem;text-align:center;max-height:90rem;margin:0 0}.footer{padding:15px;border-top:1px solid #f0f0f0;margin:80px auto 10px;text-align:center;font-size:15px}
      `}</style>
    </div>
    </>
  );
}
