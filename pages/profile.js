import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';
import { TextField, CallToAction, useToast, TextButton } from '@magiclabs/ui';

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
    if (!user) return;
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
    for (i = 0; i < tokenURIs.length; ++i) {
      prices[i] = tokenURIs[i][2];
      onMarket[i] = tokenURIs[i][6];
      nums[i] = tokenURIs[i][5];
      stars[i] = tokenURIs[i][4];
      verify[i] = tokenURIs[i][7];
      const response = await fetch(tokenURIs[i].data);
      const data = await response.json();
      nfts.push(data);
    }

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
      <h1>Your rocking collection of works</h1>
      <p>Interesting taste...we're not judging, just noticing. <TextButton
        onPress={copyLink}
      >
        Might as well share it right?
      </TextButton>
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
          margin: 20px;
          min-height: 28px;
        }
        `}</style>
    </div>
  ) : (
    <Loading />
  );
}
