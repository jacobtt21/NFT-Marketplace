import { MonochromeIcons, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Trust | Oustro</title>
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
            <h6>
              <Link
              href="#beyond"
              >
                <TextButton>
                Beyond Software Security
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="#grade"
              >
                <TextButton>
                  Enterprise Grade Security
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="#what"
              >
                <TextButton>
                What you can do
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="#important"
              >
                <TextButton>
                Important Notices
                </TextButton>
              </Link>
            </h6>
          </div>
          <div>
            <h1>Trust on Oustro</h1>
            <h2 id="intro">Intro</h2>
            <h3>Here at Oustro, having your trust and ensuring your safety is of the outmost priority. We’ve outlined what we’ve done to make Oustro a secure platform and what you can do to help protect your account.</h3>
            <h2 id="beyond">Beyond Software Security</h2>
            <h3>A core security principle at Oustro is the idea of prevention over cure. We've taken numerous steps with partners to ensure Oustro is a safe environment at continuously monitor the health and security of processes that keep you safe. Additionally, Oustro believes in leaving what we can to experts. Oustro relies on the security teams at partners like Google, Magic, etc., to do their job for their own enterprise partners. We leave the safety and security of their infrastructure to them, but also monitor the health of our own platform to ensure a breach doesn't seep into the Oustro platform.</h3>
            <h2 id="grade">Enterprise Grade Security</h2>
            <h3>Oustro uses enterprise-grade security, maintained by Google, Microsoft, and more to help ensure accounts remain safe. We do this by ditching passwords and sending magic authentication links. We made this decision because the benefits of leaving enterprise security to Google and such allowed us to focus on securing your experience on Oustro as a platform. We've enabled HTTPS connections to help encrypt data and use Magic's services to help audit against any untrusted data injection. Through the use of multiple enterprise security levels, Oustro aims to minimize vulnerabilities and dissuade attackers from attempting to infiltrate the platform. If you have any questions or concerns, please feel free to reach out to security@oustro.xyz.</h3>
            <h2 id="what">What you can do</h2>
            <h3>You can do a lot to protect your Oustro account, here are just a few we recommend:</h3>
            <br />
            <h6>1. Enable Multi-Factor Authentication on your email account.</h6>
            <h6>2. Use unique, complex usernames and passwords.</h6>
            <h6>3. Use a VPN.</h6>
            <h6>4. Clear your cache regularly.</h6>
            <h6>5. Turn off the ‘save password’ features in your browser(s).</h6>
            <h2 id="important">Important Notices</h2>
            <h3>Oustro will never do the following:</h3>
            <br />
            <h6>- Oustro will NEVER ask for your secret key.</h6>
            <h6>- Send any emails (apart from login ones).</h6>
            <h6>- Ask for any login information.</h6>
            <h6>- Collect personal information.</h6>
            <h6>- Track or ask your wallet address (public or private).</h6>
            <h6>- Ask our users to buy/sell anything.</h6>
            <h6>- Send text messages.</h6>
            <h6>- Communicate first in any manner.</h6>
            <h6>Because we keep no information about our users, Oustro cannot be responsible for any account loss.</h6>
            <br />
            <h3>If you experience any of the following, please reach out to security@oustro.xyz.</h3>
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
          line-height: 1.6;
        }
        h6 {
          margin-left: 40px;
          margin-bottom: 15px;
        }
      `}</style>
    </>
  );
}
