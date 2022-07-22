import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic, web3 } from '../lib/magic';
import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { CallToAction, TextButton, useToast, HoverActivatedTooltip, MonochromeIcons } from '@magiclabs/ui';

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
      <nav className={user ? 'nv1' : 'nv2'}>
        <ul>
          {!user ? (
            <>
              <div className="nav-container">
                <div className="nav-div">
                  <li>
                    <Link href="/showcase">
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
                  <Link href={`/`}>
                    <CallToAction
                      color={
                        router.pathname === '/'
                          ? 'primary'
                          : 'secondary'
                      }
                      size="sm"
                    >
                      For You
                    </CallToAction>
                  </Link>
                  </li>
                  <li>
                    <Link href="/library">
                      <CallToAction
                        color={
                          router.pathname === '/library' ? 'primary' : 'secondary'
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
                    <HoverActivatedTooltip
                      arrow
                      placement="top"
                      waitForPointerExit
                      appearance='none'
                    >
                      <HoverActivatedTooltip.Anchor>
                        <TextButton 
                        color="tertiary" 
                        size="sm"
                        trailingIcon={MonochromeIcons.CaretDown}
                        >
                            <img className="image-logo" src="/p2.svg" />
                            {balance.substring(0, 6)} MATIC
                        </TextButton>
                      </HoverActivatedTooltip.Anchor>
                      <HoverActivatedTooltip.Content>
                        <div>
                          <iframe
                            src="https://widget.onramper.com?color=266677&apiKey=pk_test_O5oTM6u9D3jXLHpXkPQWK_tD4dClwuplybJk0sZHyQc0"
                            height="570px"
                            width="330px"
                            title="Onramper widget"
                            frameborder="0"
                            allow="accelerometer; autoplay; camera; gyroscope; payment"
                          >
                          </iframe>
                          <br />
                        </div>
                      </HoverActivatedTooltip.Content>
                    </HoverActivatedTooltip>
                  </li>
                  <li>
                    <HoverActivatedTooltip
                      arrow
                      placement="top"
                      waitForPointerExit
                    >
                      <HoverActivatedTooltip.Anchor>
                        <CallToAction
                          color="primary"
                          size="sm"
                          outline="none"
                          leadingIcon={MonochromeIcons.Copy}
                          trailingIcon={MonochromeIcons.CaretDown}
                          onPress={copyAddress}
                        >
                          {user.publicAddress.substring(0, 6)}...
                          {user.publicAddress.substring(38)}
                        </CallToAction>
                      </HoverActivatedTooltip.Anchor>
                      <HoverActivatedTooltip.Content>
                        <Link href="https://reveal.magic.link/oustro">
                              <a target="_blank">
                                <TextButton
                                leadingIcon={MonochromeIcons.Fingerprint}
                                size='md'>
                                  Reveal Secret Key
                                </TextButton>
                              </a>
                        </Link>
                      </HoverActivatedTooltip.Content>
                    </HoverActivatedTooltip>
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
        .nv2 {
          max-width: 80rem;
          margin: 15px auto;
          min-height: 70px;
          border-bottom: 1px solid #f0f0f0;
        }

        .nv1 {
          max-width: 80rem;
          margin: 15px auto;
          min-height: 70px;
        }

        .image-logo {
          margin-left: 5px;
          margin-right: 5px;
          max-width: 25px;
        }

        .logo {
          max-width: 250px;
        }

        .nav-container,
        .nav-div {
          display: flex;
        }

        .banner {
          min-height: 30px;
          min-width: 10rem;
          text-align: center;
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
