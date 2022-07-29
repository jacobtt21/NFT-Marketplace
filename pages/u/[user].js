import React, { useEffect, useContext, useState } from 'react';
import { Router, useRouter } from 'next/router'
import { UserContext } from '../../lib/UserContext';
import { web3 } from '../../lib/magic';
import { abi } from '../../contracts/abi';
import Grid from '../../components/Grid';
import Loading from '../../components/Loading';

export default function Index() {
  const [user] = useContext(UserContext);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myPrices, setMyPrices] = useState();
  const [myStatus, setMyStatus] = useState();
  const [myNums, setMyNums] = useState();
  const [myVerify, setMyVerify] = useState();
  const [myStars, setMyStars] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var route = false;

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    if (!router.query.user) {
      return;
    }
    getMyNFTs();
  }, [router.query.user]);

  const getMyNFTs = async () => {
    setLoading(true);
    // Get array of token URI's stored in contract for given user
    // Each URI is an IPFS url containing json metadata about the NFT, such as image and name
    const tokenURIs = await contract.methods.getNFTsByOwner(router.query.user).call();

    let prices = []
    let onMarket = []
    let nums = [];
    let stars = []
    let nfts = [];
    let verify = [];

    var i = 0;

    for (i = tokenURIs.length - 1; i >= 0; --i) {
      if (tokenURIs[i]["show"]) {
        prices.push(tokenURIs[i][2]);
        onMarket.push(tokenURIs[i][6]);
        nums.push(tokenURIs[i][5]);
        stars.push(tokenURIs[i][4]);
        verify.push(tokenURIs[i][7]);
        const response = await fetch(tokenURIs[i].data);
        const data = await response.json();
        nfts.push(data);
      }
    }

    setMyNFTs(nfts);
    setMyVerify(verify);
    setMyPrices(prices);
    setMyStatus(onMarket);
    setMyNums(nums);
    setMyStars(stars);
    setLoading(false);
  };

  if (user) {
    if (user.publicAddress === router.query.user) {
        router.push('/profile');
    }
    route = true;
  }

  return myStars ? (
    <div>
      {router.query.user === "0x4feE4e9F9B253058103a5014cFd106F0eC4950E8" ? (
        <>
          <h1>Daffy Magazine</h1>
          <br/>
          <p>International news and current events, all free on Oustro</p>
        </>
      ) : router.query.user === "0x8c17bB1862B31f302e4c25bf364431f0a39614B1" ? (
        <>
          <h1>Oustro Originals</h1>
          <br/>
          <p>From us, for you, enjoy</p>
        </>
      ) : (
        <>
          <h1>{router.query.user}'s Collection</h1>
          <br/>
          <p>I can't believe this was here the entire time, I might have to "borrow it"</p>
        </>
      )}
      <Grid loading={loading} nfts={myNFTs} prices={myPrices} statuses={myStatus} type={true} stars={myStars} nums={myNums} checkmark={myVerify} go={route} takeAway={true} />
      <style>{`
        h1 {
          font-weight: bold;
          font-size: 28px;
          text-align: center;
          min-height: 28px;
        }
        p {
          text-align: center;
          min-height: 28px;
        }
      `}</style>
    </div>
  ) : (
    <Loading />
  );
}
