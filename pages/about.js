import { Icon, MonochromeIcons, TextField, CallToAction, Input } from '@magiclabs/ui';
import Typical from 'react-typical'
import Link from "next/link";

export default function About() {
  return (
    <>
    <div className='landing'>
      <h1>Confused about this whole thing?</h1>
      <br />
      <h2>Don't worry, we're here to explain...</h2>
      <br />
      <br />
      <div className='explain'>
        <iframe src="https://pitch.com/embed/6ad76e6c-5bbc-4153-a006-add6acff1ad4" allow="fullscreen" allowfullscreen="" width="560" height="368" style="border:0"></iframe>
      </div>
      <div className='footer'>
        <p>2023 Oustro Inc. v1.3.9-beta</p>
      </div>
      <style jsx>{`
        h1 {
          font-size: 50px;
        }
        h2 {
          font-size: 30px;
        }
        .landing {
          text-align:center;
        }
        .explain {
          text-align:left;
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
