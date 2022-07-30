import { CallToAction, TextButton, Linkable } from '@magiclabs/ui';
import { useState } from 'react';
import Typical from 'react-typical'
import Link from "next/link";
import Grid from '../components/Grid2';
import Head from 'next/head';

export default function About() {
    const [loading, setLoading] = useState(false);
    const allNFTs = [
      {
        creator: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://ipfs.infura.io/ipfs/QmeW4tudfHQw5fGfRcBpQW3oSV86GaFXFic3rGoLvNdgYo",
        name: "Daffy",
        tokenID: '6',
        work: "https://bafybeie5srm3bac476dokid2sde4xqxxfthfll4uqqz2qfcowsmigw673y.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://ipfs.infura.io/ipfs/Qmf2btT6oeoESpmJaZu4U4Wg2hnfwBtxoQzkujf5i8s9rM",
        name: "Snake",
        tokenID: "2",
        work: "https://bafybeickkrcva4x6egm3lx3mqdlupnvzh7o6d4zhcqgril4tmo7ebytaxq.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x944e45567ce148c63fbf56870148770ef17e1dd1",
        image: "https://ipfs.infura.io/ipfs/QmQQFYa2a43aXVuY2sapv4wjp7dFDYEMGL9VKNqF1cMcvS",
        name: "The Bottle",
        tokenID: "3",
        work: "https://bafybeiegkxna2cysmky7dlx4vkmrlj5bje6n2k6yoambbmm5vd5xqab3jy.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x33175912b347c4b3fdd861f5418d70eb4083bc47",
        image: "https://ipfs.infura.io/ipfs/QmP8Ynx6LypyYGY8ggFWErxpTCGKHb5qGMGkTgNVRdAXcy",
        name: "Spaceland Synopsis",
        tokenID: "4",
        work: "https://bafybeiakxs65n7vvw6gd4urkoqbjgpji7paf4pabqn4d72rgfmd7z3ftii.ipfs.infura-ipfs.io/"
      }
    ]
    const allNFTs2 = [
      {
        creator: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://raw.githubusercontent.com/Oustro/OustroImages/1c57d1dbdf5d079f453e6d5dfb8c7e6c8c14a77d/9.svg",
        name: "Daffy",
        tokenID: '6',
        work: "https://bafybeie5srm3bac476dokid2sde4xqxxfthfll4uqqz2qfcowsmigw673y.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://ipfs.infura.io/ipfs/QmXpVk2JSnWmNKQk8jUfFTGr6AputP13shqufexzXuSauh",
        name: "Snake",
        tokenID: "2",
        work: "https://bafybeickkrcva4x6egm3lx3mqdlupnvzh7o6d4zhcqgril4tmo7ebytaxq.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x944e45567ce148c63fbf56870148770ef17e1dd1",
        image: "https://ipfs.infura.io/ipfs/QmeBbjdrebR7VBBtt7QsQymXbvps3k6XasZZoVkZuUQzW3",
        name: "The Bottle",
        tokenID: "3",
        work: "https://raw.githubusercontent.com/Oustro/OustroImages/1c57d1dbdf5d079f453e6d5dfb8c7e6c8c14a77d/9.svg"
      },
      {
        creator: "0x33175912b347c4b3fdd861f5418d70eb4083bc47",
        image: "https://ipfs.infura.io/ipfs/QmQDVsvkr5huFjQHfjvG8ehqhL3sRvdAsVrdUtf2n9Y5bf",
        name: "Spaceland Synopsis",
        tokenID: "4",
        work: "https://bafybeihr5kms3piv26gzzzvkbqc3pqvyabwmjmltollrc3dywi6wdphakm.ipfs.infura-ipfs.io/"
      }
    ]

  return (
    <>
      <Head>
        <title>Showcase | Oustro</title>
        <meta name="description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <div className='one'>
        <div className='align5'>
          <div className='two'>
            <Typical steps={['We all have a story. Tell us yours...', 10000]} wrapper="h1"/>
            <div className='three9'>
            A modern social library and marketplace that pulls together all of the expression outlets of the modern web.
            </div>
            <div className='three91'>
              <Link href='/login'>
                <CallToAction>
                  Welcome to Oustro
                </CallToAction>
              </Link>
            </div>
          </div>
          <div className='three'>
            <img 
              src="/falling.svg"
              width="500" 
              alt="" 
            /> 
          </div>
        </div>
        <div className='grow'>
          Check out our fully decentralized library of works. Buy and sell, support creators, and build communities around ideas.        
        </div>
        Check out some of the featured works by creators on Oustro
        <Grid loading={loading} nfts={allNFTs} go={true} />
        <div className='vlur'>
          <Grid loading={loading} nfts={allNFTs2} go={false} />
        </div>        
        <div className='Imagine'>
          <Link href="/login">
            <CallToAction
            size='lg'
            >
              Feeling inspired?
            </CallToAction>
          </Link>
        </div>
        <div className='three2'>
          We ❤️ decentralization, which means one thing:
        </div>
        <div className='three3'>
          What's published on Oustro, stays on Oustro.
        </div>
        <br />
        <Link href="/about#safety">
          <TextButton
          size='md'>
            Learn how we protect Oustro &rarr;
          </TextButton>
        </Link>
        <div className='align'>
          <div>
            <h4>Share Your Voice, Your Way</h4> 
            <h6>
              We believe everyone has something to say, create, invent, and share. We also believe that You should have a 
              place to keep those works without fear of censorship. On Oustro, we provide a platform to create and share 
              what you want through PDFs, HTML, MP4 files all hosted on IPFS.
            </h6>
            <br />
            <Link href="/login?id=mint">
              <CallToAction
              >
                Start Sharing
              </CallToAction>
            </Link>
          </div> 
          <div>
            <img 
              src="https://rawcdn.githack.com/Oustro/OustroImages/b7d2c4f52e1fe84ffd6e875c3a0f999ae4a8b4cd/8.svg"
              width="500" 
              alt="" 
            /> 
          </div>         
        </div>
        <div className='align'>
          <div>
            <img 
              src="https://rawcdn.githack.com/Oustro/OustroImages/02c26a155c63134c77ba2a80b2a24a54ab7d7fe7/1.svg?min=1"
              width="500" 
              alt="" 
            /> 
          </div>  
          <div>
            <h4>Buy What Moves You</h4> 
            <h6>
              With so many works on Oustro, you're bound to find something that inspires you and 
              gives you another perspective on the world around you. 
              Become the steward of that work, set the price, and take ownership of what you feel the world needs to 
              know about.
            </h6>
            <br />
            <Link href="/login?id=library">
              <CallToAction
              >
                See What's Available
              </CallToAction>
            </Link>
          </div>        
        </div>
        <div className='align'>
          <div>
            <h4>Support Dream(er)s</h4> 
            <h6>
              Our creators are what make Oustro what we are. Support them and their work by sharing and rating their work.
              Fund them directly or through Oustro and help them pursue their calling.
            </h6>
            <br />
            <Link href="/login">
              <CallToAction
              >
                Help Bring Dreams to Life
              </CallToAction>
            </Link>
          </div> 
          <div>
            <img 
              src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/3.svg?min=1"
              width="500" 
              alt="" 
            /> 
          </div>         
        </div>
        <div className='align'>
          <div>
            <img 
              src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/2.svg?min=1"
              width="500" 
              alt="" 
            /> 
          </div>  
          <div>
            <h4>Build Communities Around Ideas</h4> 
            <h6>
              Great things are often written down and put on display. Join us as we put our ideas out there for the world
              and connect with what, and who, you believe in.
            </h6>
            <br />
            <Link href="/login">
              <CallToAction
              >
                Find Your People
              </CallToAction>
            </Link>
          </div>        
        </div>
        <div className='Logos'>
          <h4>Oustro is Proud to be Featured in</h4>
          <div className='Inv'>
            <img
            src="https://s.gitcoin.co/static/v2/images/presskit/logotype.41fe3e22f370.svg"
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />  
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Product_Hunt_Logo.svg"
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />
            <img
            src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/Magazine.svg?min=1"
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />  
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='align2'> 
          <div>
            <h5 className='howU'>
              Resouces
            </h5>
            <h5>
              <a 
              href="/login?id=contact"
              target="_blank"
              >
                Press
              </a>
            </h5>
            <h5>
              <a 
              href="https://oustro.zendesk.com/hc/en-us"
              target="_blank"
              >
                Help Center
              </a>
            </h5>
            <h5>
              <a 
              href="/code"
              target="_blank"
              >
                Legal
              </a>
            </h5>
            <h5>
              <a 
              href="https://discord.gg/V3k3uRDy"
              target="_blank"
              >
                Community
              </a>
            </h5>
            <h5>
            <a 
              href="https://oustro.statuspage.io/"
              target="_blank"
              >
                Status
              </a>
            </h5>
          </div> 
          <div>
            <h5 className='howU'>
              Company
            </h5>
            <h5>
              <a 
              href="/"
              target="_blank"
              >
                Blog
              </a>
            </h5>
            <h5>
              <a 
              href="/"
              target="_blank"
              >
                Careers
              </a>
            </h5>
            <h5>
              <a 
              href="https://linktr.ee/oustro"
              target="_blank"
              >
                Social Media
              </a>
            </h5>
            <h5>
              <a 
                href="/contact"
                target="_blank"
                >
                  Contact
                </a>
            </h5>
          </div> 
          <div>
            <h5 className='howU'>
              Products
            </h5>
            <h5>
              Oustro Publishing
            </h5>
            <h5>
              Oustro Daffy
            </h5>
            <h5>
              Oustro Orginals
            </h5>
          </div> 
          <div>
          </div>
          <div>
            <Link href="/showcase">
              <img src='/oustro_logo.svg' className='logo' />
            </Link>
            <h3>
              315 Boyett St, College Station, TX 77840
            </h3>
            <br />
            <h3>
              We all have a story, tell yours
            </h3>
            © 2022 Oustro Inc.
          </div>       
        </div> 
      </div>
      <style jsx>{`
        h4 {
          font-size: 40px;
          font-weight: bold;
        }
        .howU {
          font-weight: bold;
        }
        a {
          color: black;
          background-color: transparent;
          text-decoration: none;
          transition: 0.3s;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
        }
        a:hover {
          transition: 0.3s;
          color: #6851FF;
          background-color: transparent;
          text-decoration: underline;
        }
        h6 {
          font-size: 20px;
          margin-top: 15px;
          line-height: 1.6;
        }
        h5 {
          margin-top: 15px;
          text-align: left;
        }

        .three91 {
          text-align: center;
        }
        .one { 
          margin: 80px; 
          text-align:center; 
          font-size: 17px;
        }
        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 30px;
          margin-top: 0px;
          align-items: center;
        }
        .align5 {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 3fr 2fr;
          margin-bottom: 30px;
          margin-top: 0px;
        }
        .grow {
          font-size: 35px;
          margin-bottom: 15px;
        }
        .Logos {
          border-top:1px solid #f0f0f0;
          padding: 30px;
        }
        .align2 {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr 1fr 1fr 3fr;
          margin-bottom: 30px;
          margin-top: 0px;
          line-height: 1.6;
        }
        .two { 
          font-weight: bold;
          margin:20px; 
          text-align:left; 
          font-size: 60px;
        }
        .three { 
          margin-bottom:15px; 
          text-align:center; 
          font-size: 25px;
        }
        .three2 { 
          margin-top:35px; 
          text-align:center; 
          font-size: 30px;
          font-weight: bold;
        }
        .three9 { 
          margin-top:30px;  
          text-align: center;
          font-size: 24px;
          font-weight:normal;
        }
        .three3 { 
          margin-top:15px; 
          text-align:center; 
          font-size: 30px;
        }
        .vlur{
          filter: blur(17px);
          margin-top:-120px;
        }
        .Imagine {
          margin-top:-340px;
          margin-bottom: 250px;
          // filter: blur(5px);
        }
        img {
          width: auto,
          height: 100px
        }
        .logo {
          max-width: 250px;
          text-align:center;
          margin:0 0
        }
        .nft-img {
          max-width: 400px;
          max-height: 400px;
          cursor: pointer;
          border-radius: 8px;
          margin: 30px;
        }
        .nft-img {
          max-width: 1000px;
          max-height: 400px;
          cursor: pointer;
          border-radius: 8px;
          margin: 30px;
        }
        .Inv {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
        }
        .landing {
          text-align:center;
          font-size:50px
        }
        .footer {
          padding:30px;
          border-top:1px solid #f0f0f0;
          text-align:center;
          font-size:15px;
        }
      `}</style>
    </>
  );
}