import { CallToAction, TextButton, MonochromeIcons, TextField, Icon } from '@magiclabs/ui';
import { useState } from 'react';
import Link from "next/link";
import Grid from '../components/Grid2';
import Head from 'next/head';
import Typical from 'react-typical'
import Image from 'next/image'
import algoliasearch from 'algoliasearch';
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";

export default function About() {
    const searchClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    );
    const [loading, setLoading] = useState(false);
    const allNFTs = [
      {
        creator: "jacob",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://oustro.infura-ipfs.io/ipfs/QmNjVShc4TVZ7rK1UKBSsu1HrRmr6wN1NLDzfwhvQwNi8v",
        name: "Starlight",
        tokenID: '4',
        work: "https://bafybeie5srm3bac476dokid2sde4xqxxfthfll4uqqz2qfcowsmigw673y.ipfs.infura-ipfs.io/"
      },
      {
        creator: "Oustro",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://oustro.infura-ipfs.io/ipfs/QmZ2ptqDDEZ3sW7o3q6bEUWJ2nXHJQXCsKhrf3ht9aTV1j",
        name: "Daffy",
        tokenID: "3",
        work: "https://bafybeickkrcva4x6egm3lx3mqdlupnvzh7o6d4zhcqgril4tmo7ebytaxq.ipfs.infura-ipfs.io/"
      },
      {
        creator: "Oustro",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://oustro.infura-ipfs.io/ipfs/QmdEMNuUqehFmtcrmzyGgcSpxQYjeD4ebPdyE69pr4Asyn",
        name: "Sunsets, Beach Walks, and a Mystery",
        tokenID: "2",
        work: "https://bafybeiegkxna2cysmky7dlx4vkmrlj5bje6n2k6yoambbmm5vd5xqab3jy.ipfs.infura-ipfs.io/"
      },
      {
        creator: "Oustro",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://oustro.infura-ipfs.io/ipfs/QmdJ7euXQHDF36Fd9kENhMQu3mSmT1G27dvz4myS5i9iaL",
        name: "The Snake Game as an NFT",
        tokenID: "1",
        work: "https://bafybeiakxs65n7vvw6gd4urkoqbjgpji7paf4pabqn4d72rgfmd7z3ftii.ipfs.infura-ipfs.io/"
      }
    ]
    const allNFTs2 = [
      {
        creator: "0x944e..1dd1",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://raw.githubusercontent.com/Oustro/OustroImages/1c57d1dbdf5d079f453e6d5dfb8c7e6c8c14a77d/9.svg",
        name: "Hi",
        tokenID: '1',
        work: "https://bafybeie5srm3bac476dokid2sde4xqxxfthfll4uqqz2qfcowsmigw673y.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x944e..1dd1",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://oustro.infura-ipfs.io/ipfs/QmeJuH7VT55fZEU28jAquKi8h6q4Wsmmv6tCjmiMutFKuS",
        name: "Snake",
        tokenID: "2",
        work: "https://bafybeickkrcva4x6egm3lx3mqdlupnvzh7o6d4zhcqgril4tmo7ebytaxq.ipfs.infura-ipfs.io/"
      },
      {
        creator: "0x944e..1dd1",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://oustro.infura-ipfs.io/ipfs/QmXpVk2JSnWmNKQk8jUfFTGr6AputP13shqufexzXuSauh",
        name: "The Bottle",
        tokenID: "3",
        work: "https://raw.githubusercontent.com/Oustro/OustroImages/1c57d1dbdf5d079f453e6d5dfb8c7e6c8c14a77d/9.svg"
      },
      {
        creator: "0x944e..1dd1",
        creatorAd: "0x8c17bB1862B31f302e4c25bf364431f0a39614B1",
        image: "https://oustro.infura-ipfs.io/ipfs/QmQoYR8oCaUxS2i7Q4utwD38g6iQoDkRGHjfuKA2o3UuQ9",
        name: "Spaceland Synopsis",
        tokenID: "4",
        work: "https://bafybeihr5kms3piv26gzzzvkbqc3pqvyabwmjmltollrc3dywi6wdphakm.ipfs.infura-ipfs.io/"
      }
    ]

    const Hit = ({ hit }) => (
      <>
        <div className='align'>
          <div
          style={{
            textAlign: 'center'
          }}
          >
            <img 
              src={hit.image}
              width="400" 
              alt="" 
            /> 
          </div>  
          <div
          style={{
            textAlign: 'center'
          }}>
            <h4>{hit.name}</h4> 
            <br />
            <Link href={{pathname: "/s/[id]", query: { id: hit.tokenID }}}>
              <CallToAction
              >
                Check out &rarr;
              </CallToAction>
            </Link>
          </div> 
        </div>
        <style jsx>{`
          .align {
            padding: 20px;
            display: grid;
            grid-gap: 20px;
            grid-template-columns: 1fr 1fr;
            margin-bottom: 30px;
            margin-top: 0px;
            align-items: center;
            border-bottom:1px solid #f0f0f0;
          }
  
          h4 {
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 30px;
          }
  
          h6 {
            font-size: 20px;
  
          }
  
          img {
            border-radius: 15px;
          }
        `}</style>
      </>
    );
  
    const SearchBox = ({ currentRefinement, refine }) => (
      <>
        <form  
        noValidate 
        action="" 
        role="search"
        >
          <input 
          className="nosubmit" 
          type="search" 
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)} 
          placeholder="Search for an NFT, find something special, and enjoy a new favorite">
          </input>
        </form>
        {currentRefinement ? (
          <Hits hitComponent={Hit} />
        ) : (
          <></>
        )}
        <style jsx>{`
          .nosubmit {
            border-radius: 10px;
            border: 1px solid #555;
            width: 100%;
            font-size: 18px;
            transition: 0.2s;
            border: 1px solid #E5E5E5;
            height: 30px;
            padding: 25px 100px 25px 40px;
            background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
          }
          .nosubmit:hover {
            outline: none !important;
            border: 1px solid #6851FF;
          }
          .nosubmit:focus {
            transition: 0.2s;
            outline: none !important;
            border: 1px solid #6851FF;
            box-shadow: 0 0 1px 2px #6851FF; 
          }
        `}</style>
      </>
    );  
  
    const CustomSearchBox = connectSearchBox(SearchBox);

  return (
    <>
      <Head>
        <title>Showcase | Oustro</title>
        <meta name="description" content="The world's only web3 home to filmmakers, musicians, academics, artists, and more." />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <div className='one'>
        <div className='grow'>
          <h1>
            <Typical steps={['On Oustro, NFTs are Films.', 2500, 'On Oustro, NFTs are Web Games.', 2500,
            'On Oustro, NFTs are Books.', 2500, 'On Oustro, NFTs are Research Papers.', 2500, 
            'On Oustro, NFTs are Scripts.', 2500, 'On Oustro, NFTs are Music.', 2500,
            'On Oustro, NFTs are Poems.', 2500, 'On Oustro, NFTs are Art.', 2500,
            'On Oustro, NFTs are Magazines.', 2500]} 
            loop={Infinity}
            />
          </h1>
        </div>
        <div className='checkout'>
          Explore the world's first NFT marketplace for more than just images.       
        </div>
        <div className='search'>
          <InstantSearch searchClient={searchClient} indexName="Oustro">
            <CustomSearchBox />
          </InstantSearch>
        </div>
        <div className='checkout2'>
          Join the only web3 community for filmmakers, musicians, academics, artists, and more.       
        </div>
        <div style={{
          marginTop: 10
        }}>
          Buy, sell, or browse some of their works below, uniquely created as NFTs and only found on Oustro.
        </div> 
        <Grid loading={loading} nfts={allNFTs} go={true} />
        {/* <div
        style={{
          marginTop: -120
        }}
        >
          <Grid loading={loading} nfts={allNFTs2} go={false} />
          <div className='vlur'>
            &nbsp;
          </div>  
        </div>        */}
        <div className='Imagine'>
          <Link href="/login">
            <CallToAction
            size='lg'
            >
              See More Like These &rarr;
            </CallToAction>
          </Link>
        </div> 
        <div className='align'>
          <div>
            <h4>Share Your Voice, Your Way</h4> 
            <h6>
            Publish and display your work in various formats, all chosen to give you the most creative freedom, as NFTs. 
            Be it an academic paper you have written, a short film you have made, or a webpage you have developed, it is all 
            welcome on Oustro.
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
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/9709cb8452cb9be70a2b225e40de954f07a928b7/8.svg"
              width="500" 
              priority
              height="500"
              alt="person sharing" 
            /> 
          </div>         
        </div>
        <div className='align'>
          <div>
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/3bd7a8deee3f0995d0e3b1f7a1fb5135ad91395d/2.svg"
              width="500"
              priority
              height="500" 
              alt="person with hat" 
            /> 
          </div>  
          <div>
            <h4>Build Communities Around Ideas</h4> 
            <h6>
            With built-in community-building tools, Oustro provides creators a way to rally their audiences 
            around ideas, stories, and much more.
            </h6>
            <br />
            <Link href="/login?id=community/all">
              <CallToAction
              >
                Find Your People
              </CallToAction>
            </Link>
          </div>        
        </div>
        <div className='align90'>
          <div>
            <h4>Help Push the NFT industry to a</h4>
            <h4
            style={{
              color: '#299617'
            }}
            >Greener Solution</h4> 
            <h6>
            Unlike our competitors, Oustro’s NFTs are all carbon-negative, thanks to the innovation of the Polygon Blockchain. Support us on our mission toward making NFTs environmentally friendly. 
            </h6>
            <br />
            <Link href="/sustainability">
              <CallToAction
              >
                Go Greener with Oustro
              </CallToAction>
            </Link>
          </div> 
          <div>
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/1c654a960363966e7b10372b31b2ec34a39b937e/20.svg"
              height="600"
              priority
              width="600" 
              alt="person with kite" 
            /> 
          </div>         
        </div>
        <div className='align'>
          <div>
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/c95e01491d100885b3345971c7fa21bff73aeaef/3.svg"
              height="500"
              priority
              width="500" 
              alt="person with kite" 
            /> 
          </div> 
          <div>
            <h4>Support Dream(er)s</h4> 
            <h6>
            Help fund creators on Oustro by donating directly to their public Polygon address or 
            through ThumbsUp&#8482;, Oustro's reward-feedback system.
            </h6>
            <br />
            <Link href="/login">
              <CallToAction
              >
                Help Bring Dreams to Life
              </CallToAction>
            </Link>
          </div>         
        </div>
        <div className='align'>  
          <div>
            <h4>Buy What Moves You</h4> 
            <h6>
            Unlike previous NFT marketplaces, creators may now sell exclusive rights to various content aside from images. 
            Furthermore, creators may choose to share royalties earned from their works.
            </h6>
            <br />
            <Link href="/login?id=library">
              <CallToAction
              >
                See What's Available
              </CallToAction>
            </Link>
          </div>
          <div>
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/e36c2a3c46529c2498d84ac81697dd2265d0896c/1.svg"
              width="500"
              priority
              height="500" 
              alt="sitting on couch" 
            /> 
          </div>       
        </div>
        <div className='compare' id="why">
          <h4>Why Oustro?</h4>
          <h6>
            Here is a complete comparison between Oustro and similar applications.
          </h6>
          <div className='align5'>
            <div className='com'>
            </div> 
            <div className='com'>
              <Image
                src="/oustro_s_logo.svg"
                width="50"
                height="50"  
                alt="OUstro logo" 
              /> 
              <br/>
              Oustro
            </div>  
            <div className='com'>
              <img
                src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png"
                width="50" 
                height="50" 
                alt="logo fo another" 
              /> 
              <br/>
              OpenSea
            </div> 
            <div className='com'>
              <Image
                src="https://raw.githubusercontent.com/Oustro/OustroImages/f6400a42e43a7e0ca1a80b1b03d00283a7c0e755/Rari.svg"
                width="50"
                height="50"  
                alt="ratible " 
              /> 
              <br/>
              Rarible
            </div>  
            <div className='com'>
              <Image
                src="/mirror.svg"
                width="60" 
                height="60"
                alt="logo Mirror" 
              /> 
              <br/>
              Mirror
            </div>        
          </div>
          <div className='align5'>
            <div className='com'>
              Support HTML, PDF, and MP4 files as NFTs. 
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div> 
            <div className='coms'>
              Support MP4 up to 100MB
            </div>  
            <div className='coms'>
              Support MP4 up to 100MB
            </div> 
            <div className='coms'>
              Support MP4 up to 50MB
            </div>          
          </div>
          <div className='align5'>
            <div className='com'>
              Allow creators to make money without having to sell
              their work
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>  
            <div className='com'>
            </div> 
            <div className='com'>
            </div> 
            <div className='com'>
              <TextButton
                leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>          
          </div>
          <div className='align5'>
            <div className='com'>
              Carbon neutral/negative NFTs
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>  
            <div className='com'>
            </div> 
            <div className='com'>
            </div> 
            <div className='com'>
            </div>          
          </div>
          <div className='align5'>
            <div className='com'>
              Create, buy, and sell NFTs
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>  
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>          
          </div>
          <div className='align5'>
            <div className='com'>
              Free access to everything
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>  
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div> 
            <div className='com'>
            </div>          
          </div>
          <div className='align5'>
            <div className='com'>
              Seamless web3 onboarding
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>  
            <div className='com'>
            </div> 
            <div className='com'>
            </div> 
            <div className='com'>
            </div>          
          </div>
          <div className='align5'>
            <div className='com'>
              Share royalties with multiple users
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div>  
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div> 
            <div className='com'>
            </div> 
            <div className='com'>
            </div>          
          </div>
          <div className='align5s'>
            <div className='com'>
              100% Decentralized
            </div> 
            <div className='com'>
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}>
              </TextButton>
            </div> 
            <div className='com'>
            </div>
            <div className='com'>
            </div>
            <div className='com'>
            </div>       
          </div>
        </div>
        <div className='Logos'>
          <h4>Oustro is Proud to be Featured in</h4>
          <div className='Inv'>
            <div
            style={{
              alignText: 'center'
            }}
            >
              <img
              src="https://d31ygswzsyecnt.cloudfront.net/static/v2/images/new-logos/gc-h-pos.svg"
              width={300}
              className="logo-img"
              onError={(e) => (e.target.src = '/fallback.jpeg')}
              alt='hmsd f'
              /> 
            </div>
            <div
            style={{
              alignText: 'center'
            }}
            >
              <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Product_Hunt_Logo.svg"
              width={300}
              className="logo-img"
              onError={(e) => (e.target.src = '/fallback.jpeg')}
              alt='product hunt'
              />  
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='align2'> 
          <div>
            <h5 className='howU'>
              Resources
            </h5>
            <h5>
              <a 
              href="/contact"
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
              href="/legal"
              >
                Legal
              </a>
            </h5>
            <h5>
              <a 
              href="/faq"
              >
                FAQs
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
              >
                Blog
              </a>
            </h5>
            <h5>
              <a 
              href="/"
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
              href="/about"
              >
                About
              </a>
            </h5>
          </div> 
          <div>
            <h5 className='howU'>
              Products
            </h5>
            <h5>
              <a 
              href="/"
              >
                Oustro Publishing
              </a>
            </h5>
            <h5>
              <a 
              href="/s/6"
              >
                Oustro Daffy
              </a>
            </h5>
            <h5>
              <a 
              href="/u/0x898a8b91c2099e4a08983692d3c86f9a95489cfa"
              >
                Oustro Orginals
              </a>
            </h5>
            <h5>
              <a 
              href="/faq#thumbsUp"
              >
                ThumbsUp&#8482;
              </a>
            </h5>
          </div> 
          <div>
          </div>
          <div>
            <Link href="/showcase">
              <img src='/oustro_logo.svg' 
              className='logo' 
              alt='oustro logo'
              />
            </Link>
            <h3>
              Made in Texas 🤠
            </h3>
            <h3>
              We all have a story, tell yours
            </h3>
            © 2023 Oustro, LLC
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
        .checkout {
          color: #6851FF;
          margin-top: 10px;
          margin-bottom: 30px;
          font-size: 33px;
          font-weight: bold;
          width: 1200px;
          margin: auto;
        }
        .checkout2 {
          margin-top: 50px;
          font-size: 25px;
          margin-right: auto;
        }
        .search {
          width: 80%;
          margin: 20px 10%;
        }
        h5 {
          margin-top: 15px;
          text-align: left;
        }
        .uner {
          text-decoration: underline
        }

        .three91 {
          margin-top: 5px;
          text-align: center;
        }
        .Image {
          pointer-events: none;
        }
        img {
          pointer-events: none;
        }
        .one { 
          margin-top: 150px; 
          text-align:center; 
          font-size: 17px;
          text-align: center;
        }
        .align90 {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 30px;
          margin-top: -50px;
          align-items: center;
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
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          border-bottom:2px solid #f0f0f0;
          padding: 30px;
        }
        .align5s {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          padding: 30px;
          margin-bottom: 40px;
          font-weight: bold;
        }
        .com {
          align-items: center;
          text-align: center;
        }
        .coms {
          align-items: center;
          text-align: center;
          font-size: 15px;
        }
        .compare {
          width: 1200px;
          margin: 0 auto;
        }
        h1 {
          font-size: 70px;
          margin-bottom: 30px;
          font-weight: bold;
        }
        h2 {
          font-size: 35px;
          margin-top: 15px;
          text-align: center;
        }
        .grow {
          font-weight: bold;
          margin-top: -120px;
          margin-bottom: 25px;
          text-align: center;
        }
        .Logos {
          padding: 30px;
          margin: auto;
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
          margin-top:80px; 
          text-align:center; 
          font-size: 30px;
          font-weight: bold;
        }
        .three9 { 
          margin-top:50px;  
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
          background: white;
          margin-top: -350px;
          width: 200%;
          height: 290px;
          opacity: 98%;
          filter: blur(27px);
        }
        .Imagine {
          margin-top: -100px;
          // margin-top: -200px;
          margin-bottom: 150px;
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
          grid-template-columns: 1fr 1fr;
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