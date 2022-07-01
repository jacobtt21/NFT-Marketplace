import { CallToAction, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Confused? | Oustro</title>
        <meta name="description" content="Learn more about Oustro" />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/about"
          key="canonical"
        />
      </Head>
      <div className='landing'>
        <div>
          <Link href="#mission">
            <TextButton>
              Our Mission |
            </TextButton>
          </Link>
          <Link href="#how">
            <TextButton>
              How does Oustro Work?
            </TextButton>
          </Link>
        </div>
        <div className="mint-container" id="mission">
          <h1>Our Mission is to give a chance for their voice to be heard</h1>
          <img
          src="/about-image.png"
          width={300}
          className="nft-img"
          onError={(e) => (e.target.src = '/fallback.jpeg')}
          />
          <h2>and that starts by giving them a platform to speak.</h2>
        </div>
      
        <div className="mint-container" id="how">
          <h1>Our Mission is to give a chance for their voice to be heard</h1>
          <img
          src="/about-image.png"
          width={300}
          className="nft-img"
          onError={(e) => (e.target.src = '/fallback.jpeg')}
          />
          <h2>and that starts by giving them a platform to speak.</h2>
        </div>
        <div className='footer'>
          <p>2023 Oustro Inc. v2.0</p>
        </div>
        <style jsx>{`
          .mint-container {
            max-width: 400px;
            text-align: center;
            margin: 0 auto;
            margin-top: 30px;
          }
          .nft-img {
            margin:20px;
            max-width: 400px;
            max-height: 400px;
            cursor: pointer;
            border-radius: 8px;
          }
          h1 {
            font-size: 35px;
          }
          h4 {
            font-size: 23px;
          }
          h2 {
            font-size: 30px;
            margin: 40px;
          }
          h3 {
            font-size: 20px;
            max-width: 60rem;
            margin: auto;
          }
          .landing {
            text-align:center;
            width: 75%;
            margin: auto;
          }
          .explain {
            text-align:center;
          }

          .dis {
            margin-top: 9px;
            margin-bottom: 9px;
            font-size: 11px;
          }

          .footer {
            padding:15px;
            border-top:1px solid #f0f0f0;
            margin:80px auto 10px;
            text-align:center;
            font-size:15px
          }
        `}</style>
      </div>
    </>
  );
}
