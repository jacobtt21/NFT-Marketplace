import { MonochromeIcons, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Sustainability | Oustro</title>
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
                  Sustainability
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="#links"
              >
                <TextButton>
                  Links                 
                </TextButton>
              </Link>
            </h6>
          </div>
          <div>
            <h1>Sustainability on Oustro</h1>
            <h3>The future cannot and will not exist if we destroy our planet. As much as we love blockchain technology, we love our Earth more. Therefore, despite initial technological difficulties, we have built the first NFT platform that solely operates on a carbon-neutral network.</h3>
            <br />
            <h3>Unlike our competitors, we built Oustro on Polygon, a POW (proof of work) blockchain. Therefore, NFTS minted and exchanged on Oustro are tremendously more environmentally friendly than other Ethereum-based solutions. As the Motley Fool, an accredited investment research company, states, “Until Ethereum completes its upgrade, you'd need to use a different network to mint a sustainable NFT”</h3>
            <br />
            <h3>We aren’t solving global problems by becoming carbon neutral. Still, we are encouraging a growing industry to follow in our footsteps and join us, weeding out at least one sector in the fight toward world carbon neutrality. As pioneers in Tech, we must also be leaders in world issues. Otherwise, what’s the point?</h3>
            <br />
            <h3>We won’t bore you with the technical details on this page. Still, we encourage our users to check out our extensive links below if they are interested in learning more about how the Polygon solution is environmentally friendly!</h3>
            <br />
            <h3 id="links">Links:</h3>
            <h3>
              <Link href="https://blog.polygon.technology/polygon-is-going-carbon-negative-in-2022-with-a-20-million-pledge/">
                <TextButton
                trailingIcon={MonochromeIcons.Logout}
                >
                  Polygon's Carbon Negative Annoucement
                </TextButton>
              </Link>
              |
              <Link href="https://blog.polygon.technology/polygon-the-eco-friendly-blockchain-scaling-ethereum-bbdd52201ad/">
                <TextButton
                trailingIcon={MonochromeIcons.Logout}
                >
                  Polygon's Carbon Enviornmental Pledge
                </TextButton>
              </Link>
              |
              <Link href="https://niftykit.com/polygon-eco-friendly-implications-compared-to-ethereum-and-bitcoin-usage/">
                <TextButton
                trailingIcon={MonochromeIcons.Logout}
                >
                  Polygon vs ETH vs BTC
                </TextButton>
              </Link>
            </h3>
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
        h3 {
          font-size: 20px;
          line-height: 1.2;
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
