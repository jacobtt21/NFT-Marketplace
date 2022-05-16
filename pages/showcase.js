import { Icon, MonochromeIcons, TextField, CallToAction, Input } from '@magiclabs/ui';
import { useCallback, useState, useContext } from 'react';
import Head from 'next/head';
import Typical from 'react-typical'
import Link from "next/link";
import Grid from '../components/Grid';

export default function About() {
    const [loading, setLoading] = useState(false);
    const allNFTs = [
        {
          creator: "0x581CDd503004FD4dBF52681710Cbe1A80d8fBC1d",
          image: "https://bafybeid46x24mfghxs3phs54veor3zrszqlrf7qowqkjnu7w4wmzcba2ia.ipfs.infura-ipfs.io/",
          name: "Quasr: Whitepaper",
          tokenID: '4',
          work: "https://bafybeie5srm3bac476dokid2sde4xqxxfthfll4uqqz2qfcowsmigw673y.ipfs.infura-ipfs.io/"
        },
        {
          creator: "0x128e33e92e46CeE465E16c91eC27931d2e8Bb483",
          image: "https://bafybeier5v2mx2jvxira2zdzec2ow5h3oiubw3dvgjtcstvx5qunli3oce.ipfs.infura-ipfs.io/",
          name: "The First NFT on Oustro",
          tokenID: "1",
          work: "https://bafybeiakxs65n7vvw6gd4urkoqbjgpji7paf4pabqn4d72rgfmd7z3ftii.ipfs.infura-ipfs.io/"
        },
        {
          creator: "0x09516Eb251254aD5EF243E83e30E9395D5BcB2B6",
          image: "https://bafybeicaak65tbrz3hqwxyzb36nfizadmau3hyyyifdfjccigeaovpat3a.ipfs.infura-ipfs.io/",
          name: "Spaceland, to Infinity and the Farm: Synopsis",
          tokenID: "3",
          work: "https://bafybeiegkxna2cysmky7dlx4vkmrlj5bje6n2k6yoambbmm5vd5xqab3jy.ipfs.infura-ipfs.io/"
        },
        {
          creator: "0x4feE4e9F9B253058103a5014cFd106F0eC4950E8",
          image: "https://bafybeig577fpz72sszvjurhki3ru2chgmm6yyrhj4psxxr7gr4uirxb6xq.ipfs.infura-ipfs.io/",
          name: "An Anthology of the Internet: Vol I",
          tokenID: "2",
          work: "https://bafybeiakxs65n7vvw6gd4urkoqbjgpji7paf4pabqn4d72rgfmd7z3ftii.ipfs.infura-ipfs.io/"
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
        <Typical steps={['Publishing has never been easier', 1000, 'and supporting creators have never been as rewarding.', 1000, 'Welcome to Oustro', 1000]} wrapper="h1"/>
        </div>
        <div className='three'>
          Welcome to the the new library of works, all powered by you
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
        <p>2023 Oustro Inc. v1.3.9-beta</p>
      </div>
      <style jsx>{`
      .one{ margin:80px; text-align:center; font-size: 17px;}.two{ margin:20px; text-align:center; font-size: 60px;}.three{ margin:40px; text-align:center; font-size: 30px;}img{width: auto,
        height: 100px}.logo{max-width:90rem;text-align:center;max-height:40rem;margin:0 0}
        .Imagine {margin:4px;}.landing{text-align:center;font-size:50px}.logo{max-width:90rem;text-align:center;max-height:90rem;margin:0 0}.footer{padding:15px;border-top:1px solid #f0f0f0;margin:80px auto 10px;text-align:center;font-size:15px}
      `}</style>
    </>
  );
}