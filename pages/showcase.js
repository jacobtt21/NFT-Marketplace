import { Icon, MonochromeIcons, TextField, CallToAction, Input } from '@magiclabs/ui';
import { useCallback, useState, useContext } from 'react';
import Typical from 'react-typical'
import Link from "next/link";
import Grid from '../components/Grid';

export default function About() {
    const [loading, setLoading] = useState(false);
    const allNFTs = [
        {
          creator: "0x09516Eb251254aD5EF243E83e30E9395D5BcB2B6",
          image: "https://ipfs.infura.io/ipfs/QmYoUFVGijd47sCbzxmfjZHCi7Uos4DARYFZ4ceYiZcHSJ",
          name: "The Oustro Logo",
          tokenID: '1',
          work: "https://ipfs.infura.io/ipfs/QmYwmvJkj4FdvGPGoJmetvvSbYosjN24nf9u1gWHrcekpM"
        },
        {
          creator: "0xdb522DfF03A9ae5Bb79F97b742512820760a5B94",
          image: "https://ipfs.infura.io/ipfs/Qmc7DQjuQcPuxfVos99Vw9tEURDKGsLD9gC34ZoZ3ayVtp",
          name: "BONNY - Day 1 Call Sheet",
          tokenID: "2",
          work: "https://bafybeihjdpb6x3lnipn3wnezfz63mz435oljydhqfjlw2yf7ljakxgiymq.ipfs.infura-ipfs.io/"
        },
        {
          creator: "0x128e33e92e46CeE465E16c91eC27931d2e8Bb483",
          image: "https://bafybeidu7w3fqpspse2st2c2yx7j7ztssk3kn3irz27ql3jdffl2tkmcde.ipfs.infura-ipfs.io/",
          name: "The Oustro Logo",
          tokenID: "6",
          work: "https://bafybeifvs6f2nzogryghm4ochmggnjmidrj573aguw76gkzbjepvx4wb4y.ipfs.infura-ipfs.io/"
        },
        {
          creator: "0xdb522DfF03A9ae5Bb79F97b742512820760a5B94",
          image: "https://ipfs.infura.io/ipfs/Qmc7DQjuQcPuxfVos99Vw9tEURDKGsLD9gC34ZoZ3ayVtp",
          name: "BONNY - Day 1 Call Sheet",
          tokenID: "2",
          work: "https://bafybeihjdpb6x3lnipn3wnezfz63mz435oljydhqfjlw2yf7ljakxgiymq.ipfs.infura-ipfs.io/"
        }
      ]

        const allPrices = [1, 1, 1, 1];

        const allStatus = [false, false, false, false];

        const allStars = [5, 5, 5, 5]

        const allNums = ['1000+', '1000+', '1000+', '1000+']
  return (
    <>
        <div className='one'>
        <div className='two'>
            <Typical steps={['Publishing has never been easier or more rewarding', 1000,]} wrapper="h1"/>
        </div>
        <div className='three'>
            Mint NFTs of your work and sell them, all on Oustro
        </div>
        Check out some of the featured works by creators on Oustro
      <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={false} takeAway={true}/>
      <div className='Imagine'>
        <Link href="/login">
          <CallToAction
          >
            Feeling inspired?
          </CallToAction>
        </Link>
      </div>
    </div>
      <div className='footer'>
        <p>2023 Oustro Inc. v1.0.0-beta</p>
      </div>
      <style jsx>{`
      .one{ margin:80px; text-align:center; font-size: 17px;}.two{ margin:20px; text-align:center; font-size: 60px;}.three{ margin:40px; text-align:center; font-size: 30px;}img{width: auto,
        height: 100px}.logo{max-width:90rem;text-align:center;max-height:40rem;margin:0 0}
        .Imagine {margin:4px;}.landing{text-align:center;font-size:50px}.logo{max-width:90rem;text-align:center;max-height:90rem;margin:0 0}.footer{padding:15px;border-top:1px solid #f0f0f0;margin:80px auto 10px;text-align:center;font-size:15px}
      `}</style>
    </>
  );
}