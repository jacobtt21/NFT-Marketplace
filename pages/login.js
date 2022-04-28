import { useCallback, useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Router from 'next/router';
import { Icon, MonochromeIcons, TextField, CallToAction, Input } from '@magiclabs/ui';
import Typical from 'react-typical'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import Grid from '../components/Grid';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const allNFTs = [
    {
      creator: "0x09516Eb251254aD5EF243E83e30E9395D5BcB2B6",
      image: "https://ipfs.infura.io/ipfs/QmYoUFVGijd47sCbzxmfjZHCi7Uos4DARYFZ4ceYiZcHSJ",
      name: "The Oustro Logo",
      tokenID: '%2f',
      work: "https://ipfs.infura.io/ipfs/QmYwmvJkj4FdvGPGoJmetvvSbYosjN24nf9u1gWHrcekpM"
    },
    {
      creator: "0x09516Eb251254aD5EF243E83e30E9395D5BcB2B6",
      image: "https://ipfs.infura.io/ipfs/QmYoUFVGijd47sCbzxmfjZHCi7Uos4DARYFZ4ceYiZcHSJ",
      name: "The Oustro Logo",
      tokenID: "/",
      work: "https://ipfs.infura.io/ipfs/QmYwmvJkj4FdvGPGoJmetvvSbYosjN24nf9u1gWHrcekpM"
    },
    {
      creator: "0x09516Eb251254aD5EF243E83e30E9395D5BcB2B6",
      image: "https://ipfs.infura.io/ipfs/QmYoUFVGijd47sCbzxmfjZHCi7Uos4DARYFZ4ceYiZcHSJ",
      name: "The Oustro Logo",
      tokenID: "/",
      work: "https://ipfs.infura.io/ipfs/QmYwmvJkj4FdvGPGoJmetvvSbYosjN24nf9u1gWHrcekpM"
    },
    {
      creator: "0x09516Eb251254aD5EF243E83e30E9395D5BcB2B6",
      image: "https://ipfs.infura.io/ipfs/QmYoUFVGijd47sCbzxmfjZHCi7Uos4DARYFZ4ceYiZcHSJ",
      name: "The Oustro Logo",
      tokenID: "/",
      work: "https://ipfs.infura.io/ipfs/QmYwmvJkj4FdvGPGoJmetvvSbYosjN24nf9u1gWHrcekpM"
    }
  ]

  const allPrices = [1, 1, 1, 1];

  const allStatus = [false, false, false, false];

  const allStars = [5, 5, 5, 5]

  const allNums = ['1000+', '1000+', '1000+', '1000+']

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
            font-size: 55px;
            margin:5px auto 40px;
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
      <div className='footer'>
        <p>2023 Oustro Inc. v1.0.0-beta</p>
      </div>
      <style jsx>{`
      .one{ margin:80px; text-align:center; font-size: 17px;}
        .Imagine {margin:10px auto 10px;}.landing{text-align:center;font-size:50px}.logo{max-width:90rem;text-align:center;max-height:90rem;margin:0 0}.footer{padding:15px;border-top:1px solid #f0f0f0;margin:240px auto 10px;text-align:center;font-size:15px}
      `}</style>
    </div>
    </>
  );
}
