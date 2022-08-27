import { useCallback, useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Router, { useRouter } from 'next/router';
import { Icon, MonochromeIcons, TextField, CallToAction, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      // Grab auth token after user clicks magic link in email
      const didToken = await magic.auth.loginWithMagicLink({ email, redirectURI: new URL('/callback', window.location.origin).href });

      // Validate auth token with server
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status === 200) {
        if (router.query.id) {
          setUser(await magic.user.getMetadata());
          Router.push('/'+router.query.id);
        }
        else {
          setUser(await magic.user.getMetadata());
          Router.push('/');
        }
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
      <Head>
        <title>Login | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/login"
          key="canonical"
        />
      </Head>
      <div className='btn'>
        Your safety on Oustro is our #1 priority, and that's why we secure your account with the same enterprise-level security used at Google, Microsoft, and more.
        <br />
        <Link
        href="/safety"
        >
          <TextButton>
            Learn more about how our login and security works &rarr;
          </TextButton>
        </Link>
      </div>
      <div className='align'>
        <div>
          <div className="login-container">
            <div className='form-header'>
              <img src='/oustro_s_logo.svg' className='logo' />
              <h3>Login / Sign up</h3>
            </div>
            <br />
            <TextField
              type="email"
              name="email"
              placeholder='you@example.com'
              label="Your Email"
              required="required"
              prefix={<Icon inline type={MonochromeIcons.Envelope} size={22} />}
              onChange={handleInputOnChange}
              disabled={isLoggingIn}
            />
            <br />
            <CallToAction
              leadingIcon={MonochromeIcons.PaperPlane}
              color="primary"
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
            >
              Let's go
            </CallToAction>
            <br />
            {isLoggingIn && (
              <div className='dis2'>
                <p>Please wait while we get you set up...</p>
              </div>
            )}
            <div className='dis'>
              <h6>By signing up, you agree to our Terms & Privacy Policy.</h6>
            </div>
          </div>
        </div>
        <div>
          <h1>A secure, passwordless, seamless gateway to web3.</h1>
          <h1
          style={{
            color: '#6851FF'
          }}
          >
            Welcome to Oustro.
          </h1>
        </div>
      </div>
      <style jsx>{`
        h1 {
          font-size: 45px;
          margin: 70px;
        }
        .login-container {
          font-size: 35px;
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

        h3 {
          margin-top: 30px;
          font-weight: bold;
        }
        h1 {
          font-size: 50px;
          font-weight: bold;
          text-align: left;
        }

        .logo {
          max-width: 80px;
        }

        .logo {
          max-width: 110px;
        }
        
        .btn {
          text-align: center;
          margin: 0 auto;
          margin-top: 40px;
          font-size: 20px;
          line-height: 1.2;
        }

        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 10px;
          margin-top: 50px;
          align-items: center;
          text-align: center;
        }

        .form-header {
          margin-top: 20px;
        }

        .dis {
          margin-top: 4px;
          margin-bottom: 15px;
          font-size: 11px;
        }
        .dis2 {
          margin-bottom: 10px;
          font-size: 16px;
          // font-weight: bold;
        }

        .footer {
          padding:15px;
          border-top:1px solid #f0f0f0;
          margin:240px auto 10px;
          text-align:center;
          font-size:15px
        }
      `}</style>
    </>
  );
}
