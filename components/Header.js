import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic, web3 } from '../lib/magic';
import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { CallToAction, TextButton, useToast, HoverActivatedTooltip, MonochromeIcons, Linkable } from '@magiclabs/ui';

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [balance, setBalance] = useState('0');
  const [what, setWhat] = useState('For You')
  const [link, setLink] = useState('/')
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
                      <img src='/oustro_logo.svg' 
                      alt='image of Oustro logo'
                      className='logo' />
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
                  <HoverActivatedTooltip
                    arrow
                    placement="top"
                  >
                    <HoverActivatedTooltip.Anchor>
                      <Link href={link}>
                        <CallToAction
                          color={
                            router.pathname === '/' || router.pathname === '/library'
                              ? 'primary'
                              : 'secondary'
                          }
                          trailingIcon={MonochromeIcons.CaretDown}
                          size="sm"
                        >
                          {what}
                        </CallToAction>
                      </Link>
                    </HoverActivatedTooltip.Anchor>
                    <HoverActivatedTooltip.Content>
                      <div>
                        <Link href="/">
                          <TextButton
                            size="sm"
                            onClick={() => setWhat("For You")}
                          >
                            For You
                          </TextButton>
                        </Link>
                        <br />
                        <Link href="/library">
                          <TextButton
                            size="sm"
                            onClick={() => setWhat("Library")}
                          >
                            The Complete Library
                          </TextButton>
                        </Link>
                      </div>
                    </HoverActivatedTooltip.Content>
                  </HoverActivatedTooltip>
                  </li>
                  <li>
                    <Link href="/community">
                      <CallToAction
                        color={
                          router.pathname === '/community' ? 'primary' : 'secondary'
                        }
                        size="sm"
                      >
                        Communities
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
                  <HoverActivatedTooltip
                    arrow
                    placement="top"
                  >
                    <HoverActivatedTooltip.Anchor>
                      <Link href={`/profile`}>
                        <CallToAction
                          trailingIcon={MonochromeIcons.CaretDown}
                          color={
                            router.pathname === '/profile'
                              ? 'primary'
                              : 'secondary'
                          }
                          size="sm"
                        >
                          Profile
                        </CallToAction>
                      </Link>
                    </HoverActivatedTooltip.Anchor>
                    <HoverActivatedTooltip.Content>
                      <div>
                        <Link href="/collection">
                          <TextButton
                            size="sm"
                          >
                            Your Collection
                          </TextButton>
                        </Link>
                        <br />
                        <Link href="/profile">
                          <TextButton
                            size="sm"
                          >
                            Edit Profile
                          </TextButton>
                        </Link>
                      </div>
                    </HoverActivatedTooltip.Content>
                  </HoverActivatedTooltip>
                  </li>
                </div>
                <div className="nav-div">
                  <li>
                    <HoverActivatedTooltip
                      arrow
                      placement="top"
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
                            style={{
                              height: 640,
                              width: 300,
                            }}
                          >
                          </iframe>
                        </div>
                      </HoverActivatedTooltip.Content>
                    </HoverActivatedTooltip>
                  </li>
                  <li>
                    <HoverActivatedTooltip
                      arrow
                      placement="top"
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
                        <Linkable>
                          <a 
                          target="_blank"
                          href="https://reveal.magic.link/oustro"
                          >
                            <TextButton
                            leadingIcon={MonochromeIcons.Fingerprint}
                            size='md'>
                              Reveal Secret Key
                            </TextButton>
                          </a>
                        </Linkable>
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

        .wha {
          min-width: 570px;
        }
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
