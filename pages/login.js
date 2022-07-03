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
  const [promo, setPromo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getformURL = "https://getform.io/f/75702bd8-ad85-44d1-bfcf-0b3cea026d82"
  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      if (promo === "SentFromTwitter") {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("message", "logged in using SFT");
        await fetch(getformURL, {
          method: "POST",
          body: formData
        }).then(console.log("Sent"));
        console.log("here")
      }
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
  }, [email, promo]);

  const handleInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleInputOnChange2 = useCallback((event) => {
    setPromo(event.target.value);
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
    <div className='landing'>
    <h1>Chapter 1: The Gates of Oustro</h1>
      <div className="login-container">
        <br />
        <h3 className='form-header'>Login / Sign up</h3>
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
        <div className='dis2'>
          <TextField
            type="text"
            name="promo"
            placeholder='Promo Code'
            label="Promo Code"
            prefix={<Icon inline type={MonochromeIcons.SuccessOutlined} size={22} />}
            onChange={handleInputOnChange2}
            disabled={isLoggingIn}
          />
          {promo && (
            <>
              {promo === "SentFromTwitter" ? (
                <TextButton
                leadingIcon={MonochromeIcons.SuccessFilled}
                color='success'
                size="sm"
                >
                  Valid Promo Code
                </TextButton>
              ) : (
                <>
                  <TextButton
                    leadingIcon={MonochromeIcons.Warning}
                    color='error'
                    size="sm"
                  >
                    Invalid Promo Code
                  </TextButton>
                </>
              )}
            </> 
          )}
        </div>
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
        <div className='dis'>
          <p>By signing up, you agree to our Terms & Privacy Policy.</p>
        </div>
        <style>{`
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
        `}</style>
      </div>
      <div className='footer'>
        <p>2023 Oustro Inc. v2.0</p>
      </div>
      <style jsx>{`
        .landing {
          text-align:center;
          font-size:50px
        }

        .dis {
          margin-top: 9px;
          margin-bottom: 9px;
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
    </div>
    </>
  );
}
