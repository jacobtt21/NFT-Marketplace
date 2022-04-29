import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic, web3 } from '../lib/magic';
import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { CallToAction, TextButton, useToast } from '@magiclabs/ui';

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [balance, setBalance] = useState('0');
  const router = useRouter();
  const { createToast } = useToast();

  useEffect(() => {
    if (!user) return;
    getBalance(user.publicAddress);
  }, [user]);

  const logout = () => {
    magic.user.logout().then(() => {
      setUser();
      Router.push('/login');
    });
  };

  const getBalance = async (address) => {
    const balance = await web3.eth.getBalance(address);
    setBalance(web3.utils.fromWei(balance));
  };

  const copyAddress = async () => {
    navigator.clipboard.writeText(user.publicAddress);
    createToast({
      message: 'Address Copied!',
      type: 'success',
      lifespan: 2000,
    });
  };

  return (
    <header>
      <nav>
        <ul>
          {!user ? (
            <>
            <div className="nav-container">
                <div className="nav-div">
                  <li>
                    <Link href="/about">
                      <img src='/oustro_logo.svg' className='logo' />
                    </Link>
                  </li>
                </div>
                <div className="nav-div">
                  <li>
                    <Link href="/showcase">
                      <CallToAction
                        color={
                          router.pathname === '/showcase'
                            ? 'primary'
                            : 'secondary'
                        }
                        size="sm"
                      >
                        Showcase
                      </CallToAction>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <CallToAction
                        color={
                          router.pathname === '/about' ? 'primary' : 'secondary'
                        }
                        size="sm"
                      >
                        Confused?
                      </CallToAction>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <CallToAction
                        color={
                          router.pathname === '/login' ? 'primary' : 'secondary'
                        }
                        size="sm"
                      >
                        Login
                      </CallToAction>
                    </Link>
                  </li>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="nav-container">
                <div className="nav-div">
                  <li>
                    <Link href="/">
                      <CallToAction
                        color={
                          router.pathname === '/' ? 'primary' : 'secondary'
                        }
                        size="sm"
                      >
                        Library
                      </CallToAction>
                    </Link>
                  </li>
                  <li>
                    <Link href="/mint">
                      <CallToAction
                        color={
                          router.pathname === '/mint' ? 'primary' : 'secondary'
                        }
                        size="sm"
                      >
                        Publish
                      </CallToAction>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/profile`}>
                      <CallToAction
                        color={
                          router.pathname === '/profile'
                            ? 'primary'
                            : 'secondary'
                        }
                        size="sm"
                      >
                        Your Collection
                      </CallToAction>
                    </Link>
                  </li>
                </div>
                <div className="nav-div">
                  <li>
                    <TextButton color="tertiary" size="sm">
                      Balance: {balance.substring(0, 6)} rETH
                    </TextButton>
                  </li>
                  <li>
                    <CallToAction
                      color="primary"
                      size="sm"
                      outline="none"
                      onPress={copyAddress}
                    >
                      {user.publicAddress.substring(0, 6)}...
                      {user.publicAddress.substring(38)}
                    </CallToAction>
                  </li>
                  <li>
                    <CallToAction size="sm" onPress={logout}>
                      Logout
                    </CallToAction>
                  </li>
                </div>
              </div>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 80rem;
          margin: 15px auto;
          padding: 1rem;
          min-height: 70px;
        }

        .nav-container,
        .nav-div {
          display: flex;
        }

        .nav-container {
          justify-content: space-between;
        }

        .nav-div {
          align-items: center;
        }

        img {
          max-width: 9.5rem;
        }

        li {
          margin: 0 10px;
        }

        @media (max-width: 800px) {
          .nav-container {
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 100px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
