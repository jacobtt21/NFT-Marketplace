import { CallToAction, TextButton, MonochromeIcons } from '@magiclabs/ui';
import { useState } from 'react';
import Typical from 'react-typical'
import Link from "next/link";
import Grid from '../components/Grid2';
import Head from 'next/head';

export default function About() {
    const [loading, setLoading] = useState(false);
    const allNFTs = [
      {
        creator: "0x581CDd503004FD4dBF52681710Cbe1A80d8fBC1d",
        image: "https://bafybeid46x24mfghxs3phs54veor3zrszqlrf7qowqkjnu7w4wmzcba2ia.ipfs.infura-ipfs.io/",
        name: "Quasr: Whitepaper",
        tokenID: '5',
        work: "https://bafybeie5srm3bac476dokid2sde4xqxxfthfll4uqqz2qfcowsmigw673y.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x4feE4e9F9B253058103a5014cFd106F0eC4950E8",
        image: "https://bafybeidguhkc4njtzz32gakigrfxfomj7jytkzoiticj7xr7lsn57n5uvi.ipfs.infura-ipfs.io/",
        name: "Dinner Script",
        tokenID: "3",
        work: "https://bafybeickkrcva4x6egm3lx3mqdlupnvzh7o6d4zhcqgril4tmo7ebytaxq.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x09516Eb251254aD5EF243E83e30E9395D5BcB2B6",
        image: "https://bafybeicaak65tbrz3hqwxyzb36nfizadmau3hyyyifdfjccigeaovpat3a.ipfs.infura-ipfs.io/",
        name: "Spaceland",
        tokenID: "4",
        work: "https://bafybeiegkxna2cysmky7dlx4vkmrlj5bje6n2k6yoambbmm5vd5xqab3jy.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x4feE4e9F9B253058103a5014cFd106F0eC4950E8",
        image: "https://bafybeig577fpz72sszvjurhki3ru2chgmm6yyrhj4psxxr7gr4uirxb6xq.ipfs.infura-ipfs.io/",
        name: "AAOTI: Vol I",
        tokenID: "2",
        work: "https://bafybeiakxs65n7vvw6gd4urkoqbjgpji7paf4pabqn4d72rgfmd7z3ftii.ipfs.infura-ipfs.io/"
      }
    ]

    const allPrices = [1, 1, 1, 1];

    const allStatus = [false, false, false, false];

    const allStars = [5, 5, 5, 5]

    const allVeri = [0, 0, 0, 0]

    const allNums = ['34', '78', '102', '94']

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
        <div className='two'>
          <Typical steps={['We all have a story, tell yours', 10000]} wrapper="h1"/>
        </div>
        <div className='three'>
          Check out our fully decentralized library of works. Buy and sell, support creators, and build communities around ideas.
        </div>
        Check out some of the featured works by creators on Oustro
        <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={false} takeAway={true} checkmark={allVeri} real={false}/>
        <div className='Imagine'>
          <Link href="/login">
            <CallToAction
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
            <img 
              src="/1.svg"
              width="500" 
              alt="" 
            /> 
          </div>  
          <div>
            <h4>Buy What Moves You</h4> 
            <h6>
              Buy what moves you, what inspires you, what gives you another perspective on the world
              around you. Become the steward of that work, set the price, and take ownership of what
              you feel the world needs to know about.
            </h6>
          </div>        
        </div>
        <div className='align'>
          <div>
            <h4>Support Dream(er)s</h4> 
            <h6>
              Our creators are what make Oustro what we are. Support those who you feel have something to offer the world.
              Each time you give a rating to a work, we'll send the creator a thank you from you, on us.
            </h6>
          </div> 
          <div>
            <img 
              src="/3.svg"
              width="500" 
              alt="" 
            /> 
          </div>         
        </div>
        <div className='align'>
          <div>
            <img 
              src="/2.svg"
              width="500" 
              alt="" 
            /> 
          </div>  
          <div>
            <h4>Build Communities around Ideas</h4> 
            <h6>
              The great thing about written work is that it has the capabilties to make you feel a certain way and
              make you connect with others with the same feeling, it's human nature, and we're all for it here.
            </h6>
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
            src="/magazine.svg"
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
              Press
            </h5>
            <h5>
              Help Center
            </h5>
            <h5>
              Legal
            </h5>
            <h5>
              Ads
            </h5>
            <h5>
              Community
            </h5>
            <h5>
              Status
            </h5>
          </div> 
          <div>
            <h5 className='howU'>
              Company
            </h5>
            <h5>
              Press Kit
            </h5>
            <h5>
              Blog
            </h5>
            <h5>
              Careers
            </h5>
            <h5>
              Contact Us
            </h5>
            <h5>
              Social Media
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
            <h5>
              Daffy Magazine
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
        h6 {
          font-size: 20px;
          margin-top: 15px;
          line-height: 1.6;
        }
        h5 {
          margin-top: 15px;
          text-align: left;
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
          margin:20px; 
          text-align:center; 
          font-size: 60px;
        }
        .three { 
          margin-bottom:15px; 
          text-align:center; 
          font-size: 30px;
        }
        .three2 { 
          margin-top:35px; 
          text-align:center; 
          font-size: 30px;
          font-weight: bold;
        }
        .three3 { 
          margin-top:15px; 
          text-align:center; 
          font-size: 30px;
        }
        .Imagine {
          margin-top:-60px;
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