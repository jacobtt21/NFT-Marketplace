import { CallToAction } from '@magiclabs/ui';

export default function About() {
  return (
    <>
      <div className='landing'>
        <h1>We're the melting pot of ideas, thoughts, creativity, and change.</h1>
        <br />
        <h4> Oustro is meant to be a library of everything, ranging from scientific papers, movie scripts, stories, magazines, 
        literally anything that can be converted to a PDF form. </h4>
        <br />
        <br />
        <h4>No other platform allows such a broad spectrum of mediums 
        to exist in a single place.</h4>
        <br />
        <br />
        <br />
        <h1>Creators Love Us...</h1>
        <br />
        <div className="mint-container">
          <h2>...because we support them</h2>
          <br />
          <br />
          <img
          src="/about.png"
          width={300}
          className="nft-img"
          onError={(e) => (e.target.src = '/fallback.jpeg')}
          />
          <br />
          <br />
          <br />
          <CallToAction>
            Provide the world your work
          </CallToAction>
          <br />
          <br />
          <CallToAction>
            Get paid to do so
          </CallToAction>
          <br />
          <br />
          <CallToAction>
            Build a Community
          </CallToAction>
          <br />
          <br />
          <CallToAction>
            Receieve Support Directly form Supporters
          </CallToAction>
        </div>
        <div className='footer'>
          <p>2023 Oustro Inc. v1.5-beta</p>
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
            margin:80px auto 10px;
            text-align:center;
            font-size:15px
          }
        `}</style>
      </div>
    </>
  );
}
