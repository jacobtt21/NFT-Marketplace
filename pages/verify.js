import { CallToAction, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Verification | Oustro</title>
        <meta name="description" content="Learn more about Oustro" />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/about"
          key="canonical"
        />
      </Head>
      <div className='landing'>
        <div className='holder' id="how">
          <h1>Verification on Oustro</h1>
          <br />
          <h5>
            Taken from other social medias, the verification on Oustro is meant to serve as a stamp that
            the work is orginal, contains true information (if applicable), and upholds the values of Oustro. Verification
            is done on a weekly basis by Oustro.
          </h5>
          <div className='align'>
            <div>
              <img 
                src="https://raw.githubusercontent.com/jacobtt21/OustroImages/dd84137f0fb2677230c50c97777ed6e2803c869a/7.svg?token=ANG2UHWES57WYE2643ZBSF3C2OSP6"
                width="500" 
                alt="" 
              /> 
            </div>  
            <div>
              <h2>Here is what we look for before a work gets the checkmark:</h2>
              <br />
              <h6>
                1. Is this work popular?
              </h6>
              <h3>
              we need to ensure that the works have a notable audience in order to merit us checking whether or not
              it should be reviewed for verification. Metrics are community size and rating count.
              </h3>
              <br />
              <h6>
                2. Is this work original?
              </h6>
              <h3>
              Original works can only be verified, some execptions can be made, but the original creator of the work itself
              must approve of the work being posted on Oustro before it can be verified.
              </h3>
            </div>        
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
