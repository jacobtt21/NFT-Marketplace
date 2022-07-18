import { useCallback, useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Router, { useRouter } from 'next/router';
import { Icon, MonochromeIcons, TextField, CallToAction, TextButton } from '@magiclabs/ui';
import Head from 'next/head';

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
      const didToken = await magic.auth.loginWithMagicLink({ email });

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
        <meta name="description" content="Login and Get Started for free!" />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/login"
          key="canonical"
        />
      </Head>
      <div className='align'>
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
            Send Magic Link
          </CallToAction>
          <br />
          {isLoggingIn && (
            <div className='dis2'>
              <p>Please wait as we get you all set up</p>
            </div>
          )}
          <div className='dis'>
            <p>By signing up, you agree to our Terms & Privacy Policy.</p>
          </div>
        </div>
        <div>
          <img src='/10.svg' className='logo2' />
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
          font-size: 55px;
          font-weight: bold;
          text-align: center;
        }

        .logo {
          max-width: 80px;
        }

        .logo {
          max-width: 110px;
        }

        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 10px;
          margin-top: 70px;
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
          margin-top: 25px;
          margin-bottom: 45px;
          font-size: 15px;
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
