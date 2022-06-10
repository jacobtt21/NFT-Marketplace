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
      <h1>{router.query.user}'s Collection</h1>
      <br/>
      <p>I can't believe this was here the entire time, I might have to "borrow it"</p>
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
