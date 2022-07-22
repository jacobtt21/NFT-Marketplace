import { CallToAction, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Mistake | Oustro</title>
        <meta name="description" content="Learn more about Oustro" />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/about"
          key="canonical"
        />
      </Head>
      <div className='landing'>
        <div className='holder' id="how">
          <h1>A Mistake Was Made in This Work</h1>
          <br />
          <h5>
              We're all human and we understand, sometimes we overlook things. By Request of the creator and owner of this work,
              we've marked this as such. The listing status is also determined by the owner and creator.
          </h5>
        <div>
            <img 
            src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/7.svg?min=1"
            width="500" 
            alt="" 
            /> 
        </div>        
        </div>
        <style jsx>{`
          .mint-container {
            border-bottom:1px solid #f0f0f0;
            text-align: center;
            margin: 0 auto;
            margin-top: 30px;
            padding: 30px;
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
            font-weight: bold;
          }
          h5 {
            font-size: 25px;
          }
          .align {
            padding: 20px;
            display: grid;
            grid-gap: 20px;
            grid-template-columns: 1fr 1fr;
            margin-bottom: 30px;
            margin-top: 40px;
          }
          .holder {
            margin-top: 30px;
            border-bottom:1px solid #f0f0f0;
          }
          h6 {
            font-size: 25px;
            line-height: 1.6;
            text-align: left
          }
          h2 {
            font-size: 35px;
            font-weight: bold;
            text-align: left;
          }
          h3 {
            font-size: 20px;
            line-height: 1.6;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          .landing {
            text-align:center;
            width: 75%;
            margin: auto;
          }
          .explain {
            text-align:center;
          }

          .Imagine {
            margin-top: 30px;
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
