import { Icon, MonochromeIcons, TextButton, CallToAction } from '@magiclabs/ui';
import Typical from 'react-typical'
import Link from "next/link";
import Script from 'next/script'


export default function About() {
  return (
    <>
    <div className='landing'>
      <h1>
          Verification on Oustro Explained
      </h1>
      <br />
      <h4> Coming soon</h4>
      <div className='footer'>
        <p>2023 Oustro Inc. v1.4.2-beta</p>
      </div>
      <style jsx>{`
      .mint-container {
        max-width: 400px;
        text-align: center;
        margin: 0 auto;
        padding: 40px;
        border-radius: 8px;
        border: 1px solid #f9f9f9;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }
        .nft-img {
          max-width: 400px;
          max-height: 400px;
          cursor: pointer;
          border-radius: 8px;
        }
        h1 {
          font-size: 35px;
          font-weight: bold;
        }
        h4 {
          font-size: 23px;
        }
        h2 {
          font-size: 30px;
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
          margin:480px auto 10px;
          text-align:center;
          font-size:15px
        }
      `}</style>
    </div>
    </>
  );
}
