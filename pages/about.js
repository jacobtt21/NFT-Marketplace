import { Icon, MonochromeIcons, TextField, CallToAction, Input } from '@magiclabs/ui';
import Typical from 'react-typical'
import Link from "next/link";
import Script from 'next/script'


export default function About() {
  return (
    <>
    <div className='landing'>
      <h1>Our Mission</h1>
      <br />
      <br />
      <div className='explain'>
      <h3>Oustro is on a mission to provide the world a place where ideas, creations, stories, and more can freely be available to
        the public without fear of censorship or centraliziation.
      </h3>
      <br />
      <br />
      <br />
      <iframe 
        src="https://www.canva.com/design/DAFAljchgOY/view?embed" frameborder="0" width="680" height="500" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true">
        </iframe>
      </div>
      <div className='footer'>
        <p>2023 Oustro Inc. v1.3.9-beta</p>
      </div>
      <style jsx>{`
        h1 {
          font-size: 50px;
        }
        h2 {
          font-size: 25px;
        }
        h3 {
          font-size: 30px;
          max-width: 60rem;
          margin: auto;
        }
        .landing {
          text-align:center;
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
          margin:240px auto 10px;
          text-align:center;
          font-size:15px
        }
      `}</style>
    </div>
    </>
  );
}
