import { MonochromeIcons, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Safety on Oustro | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/about"
          key="canonical"
        />
      </Head>
      <div className='landing'>
        <div className='align'>
          <div className='toc'>
            <h6>
              <Link
              href="#intro"
              >
                <TextButton>
                  Intro
                </TextButton>
              </Link>
            </h6>
          </div>
          <div>
            <h1>Why you should feel safe on Oustro</h1>
            <h2 id="intro">Intro</h2>
            <h3>Hang tight, we're working on this!</h3>
          </div>
        </div>
      </div>
      <style jsx>{`
        .align {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1.5fr 6fr;
          margin-bottom: 30px;
          margin-top: 80px;
        }
        .toc {
          padding: 30px;
        }
        h1 {
          text-align: center;
          font-size: 50px;
          font-weight: bold;
          margin-bottom: 25px;
        }
        h2 {
          font-size: 30px;
          font-weight: bold;
          margin-left: 40px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        h3 {
          font-size: 20px;
          margin-left: 40px;
        }
        h6 {
          margin-left: 40px;
          margin-bottom: 15px;
        }
      `}</style>
    </>
  );
}
