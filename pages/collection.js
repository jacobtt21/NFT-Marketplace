import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';
import { useToast, MonochromeIcons, CallToAction } from '@magiclabs/ui';
import Head from 'next/head';

export default function Index() {
  const [user] = useContext(UserContext);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myPrices, setMyPrices] = useState();
  const [myStatus, setMyStatus] = useState();
  const [myVerify, setMyVerify] = useState();
  const [myNums, setMyNums] = useState();
  const [myStars, setMyStars] = useState();
  const [loading, setLoading] = useState(false);
  const { createToast } = useToast();

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  const copyLink = async () => {
    const tokenz = "https://www.oustro.xyz/u/"+user.publicAddress;
    navigator.clipboard.writeText(tokenz);
    createToast({
      message: 'Link Copied!',
      type: 'success',
      lifespan: 2000,
    });
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyNFTs();
  }, [user]);

  const getMyNFTs = async () => {
    setLoading(true);

    // Get array of token URI's stored in contract for given user
    // Each URI is an IPFS url containing json metadata about the NFT, such as image and name
    const tokenURIs = await contract.methods.getNFTsByOwner(user.publicAddress).call();

    let prices = []
    let onMarket = []
    let nums = [];
    let stars = []
    let nfts = [];
    let verify = [];

    var i = 0;
    for (i = tokenURIs.length - 1; i >= 0; --i) {
      prices.push(tokenURIs[i][2]);
      onMarket.push(tokenURIs[i][6]);
      nums.push(tokenURIs[i][5]);
      stars.push(tokenURIs[i][4]);
      verify.push(tokenURIs[i][7]);
      const response = await fetch(tokenURIs[i].data);
      const data = await response.json();
      nfts.push(data);
      console.log(data)
    }

    console.log(tokenURIs)

    setMyNFTs(nfts);
    setMyPrices(prices);
    setMyStatus(onMarket);
    setMyNums(nums);
    setMyVerify(verify);
    setMyStars(stars);
    setLoading(false);
  };

  return user ? (
    <div>
      <Head>
        <title>Your Collection | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <h1>Your rocking collection of works &nbsp;
        <CallToAction
        onPress={copyLink}
        size='md'
        leadingIcon={MonochromeIcons.Copy}
        >
          Copy Profile Link
        </CallToAction>
      </h1>
      <p>Interesting taste...we're not judging, just noticing. Note, the rights of the works belong to the creators unless otherwise specified.
      </p>
      <Grid loading={loading} nfts={myNFTs} prices={myPrices} statuses={myStatus} type={false} stars={myStars} nums={myNums} checkmark={myVerify} go={true} takeAway={false} />
      <style>{`
        h1 {
          font-weight: bold;
          font-size: 28px;
          margin: 20px;
          min-height: 28px;
        }
        p {
          margin: 25px;
          min-height: 28px;
        }
      `}</style>
    </div>
  ) : (
    <Loading />
  );
}