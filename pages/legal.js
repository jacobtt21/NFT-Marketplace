import { MonochromeIcons, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Legal | Oustro</title>
        <meta name="description" content="Learn more about Oustro" />
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
              <TextButton>
                Privacy Policy
              </TextButton>
            </h6>
            <h6>
              <TextButton>
                Terms of Service
              </TextButton>
            </h6>
            <h6>
              <Link
              href="/code">
                <TextButton
                trailingIcon={MonochromeIcons.Logout}
                >
                  Code of Conduct
                </TextButton>
              </Link>
            </h6>
          </div>
          <div>
            <h1>Oustro Legal</h1>
            <h2>Privacy Policy</h2>
            <h3>We're working on it!</h3>
            <h2>Terms of Service</h2>
            <h3>We're working on it!</h3>
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
          margin-bottom: 40px;
          font-size: 50px;
          font-weight: bold;
        }
        h2 {
          font-size: 30px;
          font-weight: bold;
          margin-left: 40px;
        }
        h3 {
          font-size: 20px;
          margin-left: 40px;
          margin-bottom: 35px;
          margin-top: 15px;
        }
        h6 {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
