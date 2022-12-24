import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { magic, web3 } from '../lib/magic';
import { abiU } from '../contracts/abiU';
import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { CallToAction, TextButton, useToast, HoverActivatedTooltip, MonochromeIcons, Linkable } from '@magiclabs/ui';

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [balance, setBalance] = useState('0');
  const [switcher, setSwitcher] = useState(false);
  const [switcher1, setSwitcher1] = useState(false);
  const [switcher2, setSwitcher2] = useState(false);
  const [switcher3, setSwitcher3] = useState(false);
  const [switcher4, setSwitcher4] = useState(false);
  const [dp, setDP] = useState('');
  const [what, setWhat] = useState('Explore')
  const [link, setLink] = useState('/')
  const [whatC, setWhatC] = useState('Community')
  const [linkC, setLinkC] = useState('/community')
  const router = useRouter();
  const { createToast } = useToast();

  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contractUser = new web3.eth.Contract(abiU, userAddress);

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
    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (user.publicAddress).toUpperCase()) {
        setDP(userProfiles[i].displayPic);
      }
    }
  };

  const copyAddress = async () => {
    navigator.clipboard.writeText(user.publicAddress);
    createToast({
      message: 'Address Copied!',
      type: 'success',
      lifespan: 2000,
    });
  };

  async function changeDirectionwork(type) {
    setWhat(type)
    if (type === "For You") {
      setLink('/')
    }
    else if (type === "Library") {
      setLink('/library')
    }
  }

  async function changeDirectioncomm(type) {
    setWhatC(type)
    if (type === "All Communities") {
      setLinkC('/community/all')
    }
    else if (type === "Create a Community") {
      setLinkC('/community/create')
    }
  }

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
                      <img src='/oustro_logo_b.svg' 
                      alt='image of Oustro logo'
                      className='logo' />
                    </Link>
                  </li>
                </div>
                <div className="nav-div">
                  <li>
                    <HoverActivatedTooltip
                      arrow
                      placement="bottom"
                      onMouseOver={() => setSwitcher(true)}
                      onMouseLeave={() => setSwitcher(false)}
                    >
                      <HoverActivatedTooltip.Anchor>
                        <CallToAction
                          color='secondary'
                          size="sm"
                          trailingIcon={switcher ? MonochromeIcons.CaretDown : MonochromeIcons.CaretRight}
                          onMouseOver={() => setSwitcher(true)}
                          onMouseLeave={() => setSwitcher(false)}
                        >
                          Learn More
                        </CallToAction>
                      </HoverActivatedTooltip.Anchor>
                      <HoverActivatedTooltip.Content>
                        <div className='dropdown'>
                          <div className='topic'>
                            <Link
                            href="/about"
                            >
                              <TextButton
                              >
                                About Us
                              </TextButton> 
                            </Link>
                            <p>Learn the Oustro story and what our mission is.</p>
                          </div>
                          <div className='topic'>
                            <Link
                            href="/faq"
                            >
                              <TextButton
                              >
                                General Questions
                              </TextButton> 
                            </Link>
                            <p>The one-stop shop for all questions regarding Oustro.</p>
                          </div>
                          <div className='topic'>
                            <Link
                            href="/faq"
                            >
                              <TextButton
                              >
                                Blog
                              </TextButton> 
                            </Link>
                            <p>Read about what we're up to and stay updated on all things web3 and NFT.</p>
                          </div>
                          <div className='topic'>
                            <Link
                            href="/code"
                            >
                              <TextButton
                              >
                                Code of Conduct
                              </TextButton> 
                            </Link>
                            <p>Learn the do's and don'ts of Oustro.</p>
                          </div>
                          <div className='topic'>
                            <Link
                            href="/legal"
                            >
                              <TextButton
                              >
                                Legal
                              </TextButton> 
                            </Link>
                            <p>Somethings our lawyers said we needed to have.</p>
                          </div>
                          <div className='topic'>
                            <Link
                            href="/trust"
                            >
                              <TextButton
                              >
                                Trust
                              </TextButton> 
                            </Link>
                            <p>Learn what we've done to ensure your experience on Oustro is safe.</p>
                          </div>
                          <div className='topic2'>
                            <Link
                            href="/sustainability"
                            >
                              <TextButton
                              >
                                Sustainability
                              </TextButton> 
                            </Link>
                            <p>Find out how Oustro is pioneering greener NFTs.</p>
                          </div>
                        </div>
                      </HoverActivatedTooltip.Content>
                    </HoverActivatedTooltip>
                  </li>
                  <li>
                    <Link href="/login?id=mint">
                      <TextButton
                        trailingIcon={MonochromeIcons.Add}
                        outline="true"
                        color='primary'
                        size="sm"
                      >
                        Add Your Own
                      </TextButton>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <CallToAction
                        outline={
                          router.pathname !== '/login' ? true : false
                        }
                        size="md"
                      >
                        Login / Sign Up
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
                    onMouseOver={() => setSwitcher(true)}
                    onMouseLeave={() => setSwitcher(false)}
                  >
                    <HoverActivatedTooltip.Anchor>
                      <Link href={link}>
                        <CallToAction
                          color={
                            router.pathname === '/' || router.pathname === '/library'
                              ? 'primary'
                              : 'secondary'
                          }
                          trailingIcon={switcher ? MonochromeIcons.CaretDown : MonochromeIcons.CaretRight}
                          onMouseOver={() => setSwitcher(true)}
                          onMouseLeave={() => setSwitcher(false)}
                          size="sm"
                        >
                          {what}
                        </CallToAction>
                      </Link>
                    </HoverActivatedTooltip.Anchor>
                    <HoverActivatedTooltip.Content>
                      <div>
                        <div className='topics'>
                          <Link href="/">
                            <TextButton
                              size="md"
                              onClick={() => changeDirectionwork("For You")}
                            >
                              For You
                            </TextButton>
                          </Link>
                        </div>
                        <div className='topics2'>
                          <Link href="/library">
                            <TextButton
                              size="md"
                              onClick={() => changeDirectionwork("Library")}
                            >
                              Library
                            </TextButton>
                          </Link>
                        </div>
                      </div>
                    </HoverActivatedTooltip.Content>
                  </HoverActivatedTooltip>
                  </li>
                  {/* <li>
                    <HoverActivatedTooltip
                      arrow
                      placement="top"
                      onMouseOver={() => setSwitcher1(true)}
                      onMouseLeave={() => setSwitcher1(false)}
                    >
                      <HoverActivatedTooltip.Anchor>
                        <Link href={linkC}>
                          <CallToAction
                            trailingIcon={switcher1 ? MonochromeIcons.CaretDown : MonochromeIcons.CaretRight}
                            onMouseOver={() => setSwitcher1(true)}
                            onMouseLeave={() => setSwitcher1(false)}
                            color={
                              router.pathname === '/community/all' || 
                              router.pathname === '/community/create' ? 'primary' : 'secondary'
                            }
                            size="sm"
                          >
                            {whatC}
                          </CallToAction>
                        </Link>
                      </HoverActivatedTooltip.Anchor>
                      <HoverActivatedTooltip.Content>
                        <div>
                          <div className='topic'>
                            <Link href="/community/all">
                              <TextButton
                                size="md"
                                onClick={() => changeDirectioncomm("All Communities")}
                              >
                                All Communities
                              </TextButton>
                            </Link>
                          </div>
                          <div className='topic2'>
                            <Link href="/community/create">
                              <TextButton
                                size="md"
                                onClick={() => changeDirectioncomm("Create a Community")}
                              >
                                Create a Community
                              </TextButton>
                            </Link>
                          </div>
                        </div>
                      </HoverActivatedTooltip.Content>
                    </HoverActivatedTooltip>
                  </li> */}
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
                    <Link href='/collection'>
                      <CallToAction
                        color={router.pathname === '/collection' ? 'primary' : 'secondary'}
                        size="sm"
                      >
                        Collection
                      </CallToAction>
                    </Link>
                  </li>
                </div>
                <div className="nav-div">
                <li>
                    <HoverActivatedTooltip
                      arrow
                      placement="bottom"
                      onMouseOver={() => setSwitcher2(true)}
                      onMouseLeave={() => setSwitcher2(false)}
                    >
                      <HoverActivatedTooltip.Anchor>
                        <TextButton 
                        size="lg"
                        trailingIcon={switcher2 ? MonochromeIcons.CaretDown : MonochromeIcons.CaretRight}
                        onMouseOver={() => setSwitcher2(true)}
                        onMouseLeave={() => setSwitcher2(false)}
                        >
                          Learn More
                        </TextButton>
                      </HoverActivatedTooltip.Anchor>
                      <HoverActivatedTooltip.Content>
                        <div>
                          <div className='topic'>
                            <Link
                            href="/faq"
                            >
                              <TextButton
                              >
                                General Questions
                              </TextButton> 
                            </Link>
                          </div>
                          <div className='topic'>
                            <Link
                            href="/contact"
                            >
                              <TextButton
                              >
                                Give Feedback
                              </TextButton> 
                            </Link>
                          </div>
                          <div className='topic'>
                            <Link
                            href="/contact"
                            >
                              <TextButton
                              >
                                Get Support
                              </TextButton> 
                            </Link>
                          </div>
                          <div className='topic2'>
                            <Link
                            href="/code"
                            >
                              <TextButton
                              >
                                Code of Conduct
                              </TextButton> 
                            </Link>
                          </div>
                        </div>
                      </HoverActivatedTooltip.Content>
                    </HoverActivatedTooltip>
                  </li>
                  <li>
                    <HoverActivatedTooltip
                      arrow
                      placement="top"
                      appearance='none'
                      onMouseOver={() => setSwitcher3(true)}
                      onMouseLeave={() => setSwitcher3(false)}
                    >
                      <HoverActivatedTooltip.Anchor>
                        <TextButton 
                        color="tertiary" 
                        size="sm"
                        trailingIcon={switcher3 ? MonochromeIcons.CaretDown : MonochromeIcons.CaretRight}
                        onMouseOver={() => setSwitcher3(true)}
                        onMouseLeave={() => setSwitcher3(false)}
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
                      onMouseOver={() => setSwitcher4(true)}
                      onMouseLeave={() => setSwitcher4(false)}
                    >
                      <HoverActivatedTooltip.Anchor>
                        <CallToAction
                          color="primary"
                          size="sm"
                          outline="none"
                          leadingIcon={MonochromeIcons.Copy}
                          trailingIcon={switcher4 ? MonochromeIcons.CaretDown : MonochromeIcons.CaretRight}
                          onMouseOver={() => setSwitcher4(true)}
                          onMouseLeave={() => setSwitcher4(false)}
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
                    <HoverActivatedTooltip
                      arrow
                      placement="bottom"
                    >
                      <HoverActivatedTooltip.Anchor>
                        <img
                        src={dp ? dp : "/default.png"}
                        width={50}
                        height={50}
                        className="nft-img-profile-pic"
                        onError={(e) => (e.target.src = '/fallback.jpeg')}
                        />
                      </HoverActivatedTooltip.Anchor>
                      <HoverActivatedTooltip.Content>
                        <div className='topics'>
                          <Link href="/profile">
                            <TextButton
                              size="md"
                            >
                              Profile
                            </TextButton>
                          </Link>
                        </div>
                        <div className='topics2'>
                          <TextButton
                          size="md" 
                          color='error'
                          onPress={logout}
                          >
                            Logout
                          </TextButton>
                        </div>
                      </HoverActivatedTooltip.Content>
                    </HoverActivatedTooltip>
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

        .topic {
          border-bottom: 2px solid #f0f0f0;
          padding: 10px;
        }

        .topics {
          border-bottom: 2px solid #f0f0f0;
          padding: 5px;
        }

        .topics2 {
          padding: 5px;
        }

        .topic2 {
          padding: 10px;
        }

        .nft-img-profile-pic {
          border-radius: 25px;
        }

        .dropdown {
          width: 250px;
        }

        .image-logo {
          margin-left: 5px;
          margin-right: 5px;
          max-width: 25px;
        }

        .logo {
          cursor: pointer;
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
