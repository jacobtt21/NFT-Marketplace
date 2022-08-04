import { CallToAction, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Oustro</title>
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
              Our Mission
            </TextButton>
          </Link>
          |
          <Link href="#how">
            <TextButton>
              How does Oustro Work?
            </TextButton>
          </Link>
          |
          <Link href="#safety">
            <TextButton>
              Keeping Oustro Safe
            </TextButton>
          </Link>
        </div>
        <div className="mint-container" id="mission">
          <h1>Our Mission is to give everyone a chance for their voice to be heard</h1>
          <img
          src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/4.svg?min=1"
          width="500"
          className="nft-img"
          onError={(e) => (e.target.src = '/fallback.jpeg')}
          />
          <h1>that starts by giving them a platform to speak.</h1>
        </div>
        <div className='holder' id="how">
          <h1>How does Oustro Work?</h1>
          <div className='align'> 
            <div>
              <h6>
              The NFT Industry doesn’t cater to other forms of media apart from images and music. 
              Our marketplace does. At Oustro, we believe in the ownership of personal expression. What does this mean? 
              Simply put, anything can be made into an NFT, authenticating its uniqueness, and thus granting the freedom of 
              redistribution to its respective creators. Hope to sell your work? Go ahead and list it. Want to display it 
              just for show? It remains untouchable. No longer must creators or users suffer through advertisements, multiple 
              platforms, and subscription fees in order to monetize their ideas. We cut out the middleman. 
              </h6>
            </div>
            <div>
              <img 
                src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/5.svg?min=1"
                width="500" 
                alt="" 
              /> 
            </div>         
          </div>
        </div>
        <div className="mint-container1" id="safety">
          <h1>Keeping Oustro a Safe Place for Everyone</h1>
          <h3>
            At Oustro, we strive to promote the freedom of personal expression. Our aim is to build a 
            platform for our users to formulate ideas, inspire movements, and unite over common passions. 
            Oustro does not tolerate any content deemed dangerous to either the Oustro community or the world. 
          </h3>
          <Link href="/code">
            <TextButton>
              Read our Code of Conduct &rarr;
            </TextButton>
          </Link>
          <br />
          <br />
          <img 
            src="https://rawcdn.githack.com/Oustro/OustroImages/2feb41f30f48674078a88786eefa89463c589d83/6.svg?min=1"
            width="700" 
            alt="" 
            className='hw'
          /> 
        </div>
        <div className='Imagine'>
        <h1>Get in Touch</h1>
          <h3>We love hearing from you!</h3>
          <Link href="/login?id=contact">
            <CallToAction
            >
              Questions, Comments, Concerns?
            </CallToAction>
          </Link>
        </div>
      </div>
        <div className='footer'>
          <div className='align2'> 
            <div>
              <h5 className='howU'>
                Resouces
              </h5>
              <h5>
                Press
              </h5>
              <h5>
                Help Center
              </h5>
              <h5>
                Legal
              </h5>
              <h5>
                Ads
              </h5>
              <h5>
                Community
              </h5>
              <h5>
                Status
              </h5>
            </div> 
            <div>
              <h5 className='howU'>
                Company
              </h5>
              <h5>
                Press Kit
              </h5>
              <h5>
                Blog
              </h5>
              <h5>
                Careers
              </h5>
              <h5>
                Contact Us
              </h5>
              <h5>
                Social Media
              </h5>
            </div> 
            <div>
              <h5 className='howU'>
                Products
              </h5>
              <h5>
                Oustro Publishing
              </h5>
              <h5>
                Oustro Daffy
              </h5>
              <h5>
                Oustro Orginals
              </h5>
              <h5>
                Daffy Magazine
              </h5>
            </div> 
            <div>
            </div>
            <div>
              <Link href="/showcase">
                <img src='/oustro_logo.svg' className='logo' />
              </Link>
              <h4>
                315 Boyett St, College Station, TX 77840
              </h4>
              <br />
              <h4>
                We all have a story, tell yours
              </h4>
              © 2022 Oustro Inc.
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
          .mint-container1 {
            text-align: center;
            margin: 0 auto;
            margin-top: 30px;
            padding: 30px;
          }
          .logo {
          max-width: 250px;
          text-align:center;
          margin:0 0
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
            margin-top: 15px;
            text-align: left;
          }
          .hw {
            margin-top: 15px;
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
          .holder {
            margin-top: 30px;
            border-bottom:1px solid #f0f0f0;
          }
          h6 {
            font-size: 20px;
            line-height: 1.6;
            text-align: left
          }
          h2 {
            font-size: 30px;
            margin: 40px;
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
            padding:30px;
            border-top:1px solid #f0f0f0;
            text-align:center;
            font-size:15px;
            margin-top: 30px;
          }

          .howU {
            font-weight: bold;
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
        `}</style>
    </>
  );
}
