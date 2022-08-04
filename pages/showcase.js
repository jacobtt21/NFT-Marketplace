import { CallToAction, TextButton, MonochromeIcons } from '@magiclabs/ui';
import { useState } from 'react';
import Link from "next/link";
import Grid from '../components/Grid2';
import Head from 'next/head';
import Typical from 'react-typical'
import Image from 'next/image'

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
        <div className='grow'>
          <h1>
            <Typical steps={['On Oustro, NFTs are Films', 3000, 'On Oustro, NFTs are Web Games', 3000,
            'On Oustro, NFTs are Books', 3000, 'On Oustro, NFTs are Research Papers', 3000, 
            'On Oustro, NFTs are Scripts', 3000, 'On Oustro, NFTs are Music', 3000,
            'On Oustro, NFTs are Poems', 3000, 'On Oustro, NFTs are Art', 3000,
            'On Oustro, NFTs are Magazines', 3000]} 
            loop={Infinity}
            />
          </h1>
          <img
            src="/falling.svg"
            width="1100"
            height="425"
          />
        </div>
        <div className='checkout'>
          The world's only web3 home to filmmakers, musicians, academics, artists, and more. 
        </div>
        Check out some of their works below, uniquely created as NFTs and only found on Oustro
        <Grid loading={loading} nfts={allNFTs} go={true} />
        <div
        style={{
          marginTop: -120
        }}
        >
          <Grid loading={loading} nfts={allNFTs2} go={false} />
          <div className='vlur'>
            &nbsp;
          </div>  
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
        <div className='align'>
          <div>
            <h4>Share Your Voice, Your Way</h4> 
            <h6>
              Publish and display your work in various formats, all chosen to give you the most creative freedom, 
              as NFTs. Be it an academic paper you've written, a short film you've made, or a webpage you've developed, 
              it's all welcome on Oustro.
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
              height="500"
              alt="" 
            /> 
          </div>         
        </div>
        <div className='align'>
          <div>
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/e36c2a3c46529c2498d84ac81697dd2265d0896c/1.svg"
              width="500"
              height="500" 
              alt="" 
            /> 
          </div>  
          <div>
            <h4>Buy What Moves You</h4> 
            <h6>
            Unlike previous NFT marketplaces, creators may now sell exclusive rights to a variety of content aside from images. 
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
        </div>
        <div className='align'>
          <div>
            <h4>Support Dream(er)s</h4> 
            <h6>
            Help fund creators on Oustro by donating directly to their public Polygon address or 
            by providing feedback on their work.
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
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/c95e01491d100885b3345971c7fa21bff73aeaef/3.svg"
              height="500"
              width="500" 
              alt="" 
            /> 
          </div>         
        </div>
        <div className='align'>
          <div>
            <Image
              src="https://raw.githubusercontent.com/Oustro/OustroImages/3bd7a8deee3f0995d0e3b1f7a1fb5135ad91395d/2.svg"
              width="500"
              height="500" 
              alt="" 
            /> 
          </div>  
          <div>
            <h4>Build Communities Around Ideas</h4> 
            <h6>
            With built-in community-building tools, Oustro provides creators a way to rally their audiences 
            around ideas, stories, and so much more.
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
        <div className='compare' id="why">
          <h4>Why Oustro?</h4>
          <h6>
            Here's a complete comparsion between Oustro and similiar applications.
            </h6>
          <div className='align5'>
            <div className='com'>
            </div> 
            <div className='com'>
              <Image
                src="/oustro_s_logo.svg"
                width="50"
                height="50"  
                alt="" 
              /> 
              <br/>
              Oustro
            </div>  
            <div className='com'>
              <Image
                src="https://logosarchive.com/wp-content/uploads/2022/02/OpenSea-icon.svg"
                width="50" 
                height="50" 
                alt="" 
              /> 
              <br/>
              OpenSea
            </div> 
            <div className='com'>
              <Image
                src="https://raw.githubusercontent.com/Oustro/OustroImages/f6400a42e43a7e0ca1a80b1b03d00283a7c0e755/Rari.svg"
                width="50"
                height="50"  
                alt="" 
              /> 
              <br/>
              Rarible
            </div>  
            <div className='com'>
              <Image
                src="/mirror.svg"
                width="60" 
                height="60"
                alt="" 
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
              Seemless web3 onboarding
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
              src="https://s.gitcoin.co/static/v2/images/presskit/logotype.41fe3e22f370.svg"
              width={300}
              className="nft-img"
              onError={(e) => (e.target.src = '/fallback.jpeg')}
              /> 
            </div>
            <div
            style={{
              alignText: 'center'
            }}
            >
              <img
              src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/Magazine.svg?min=1"
              width={300}
              className="nft-img"
              onError={(e) => (e.target.src = '/fallback.jpeg')}
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
              className="nft-img"
              onError={(e) => (e.target.src = '/fallback.jpeg')}
              />  
            </div>
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
              href="/u/0x8c17bB1862B31f302e4c25bf364431f0a39614B1"
              >
                Oustro Orginals
              </a>
            </h5>
            <h5>
              <a 
              href="/u/0x8c17bB1862B31f302e4c25bf364431f0a39614B1"
              >
                ThumbsUp&#8482;
              </a>
            </h5>
          </div> 
          <div>
          </div>
          <div>
            <Link href="/showcase">
              <img src='/oustro_logo.svg' className='logo' />
            </Link>
            <h3>
              315 Boyett St, Austin, TX 77840
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
        .checkout {
          margin-top: 10px;
          margin-bottom: 30px;
          font-size: 30px;
          font-weight: bold;
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
          font-size: 60px;
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
          height: 290px;
          opacity: 98%;
          filter: blur(27px);
        }
        .Imagine {
          margin-top:-200px;
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