import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';

export default function Index() {
  const [user] = useContext(UserContext);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myPrices, setMyPrices] = useState();
  const [myStatus, setMyStatus] = useState();
  const [myNums, setMyNums] = useState();
  const [myStars, setMyStars] = useState();
  const [loading, setLoading] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

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
    const array = new Array(tokenURIs.length).fill(0);
    var i = 0;
    for (i = 0; i < tokenURIs.length; ++i) {
      array[i] = tokenURIs[i][0];
      prices[i] = tokenURIs[i][2];
      onMarket[i] = tokenURIs[i][6];
      nums[i] = tokenURIs[i][5];
      stars[i] = tokenURIs[i][4];
    }

    let nfts = [];

    // Call IPFS url for metadata of each NFT (json object containing name & image)
    await Promise.all(
      array.map(async (uri) => {
        const response = await fetch(uri);
        const data = await response.json();
        nfts.push(data);
      })
    );

    setMyNFTs(nfts);
    setMyPrices(prices);
    setMyStatus(onMarket);
    setMyNums(nums);
    setMyStars(stars);
    setLoading(false);
  };

  return user ? (
    <div>
      <h1>Your NFTs</h1>
      <Grid loading={loading} nfts={myNFTs} prices={myPrices} statuses={myStatus} type={false} stars={myStars} nums={myNums} />
      <style>{`
        h1 {
          font-weight: bold;
          font-size: 28px;
          margin: 20px;
          min-height: 28px;
        }
        `}</style>
    </div>
  ) : (
    <Loading />
  );
}
