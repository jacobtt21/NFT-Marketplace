import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';

export default function Index() {
  const [user] = useContext(UserContext);
  const [myNFTs, setMyNFTs] = useState([]);
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
    const tokenURIs = await contract.methods
      .getNFTsByOwner(user.publicAddress)
      .call();

    let nfts = [];

    // Call IPFS url for metadata of each NFT (json object containing name & image)
    await Promise.all(
      tokenURIs.map(async (uri) => {
        const response = await fetch(uri);
        const data = await response.json();
        nfts.push(data);
      })
    );

    setMyNFTs(nfts);
    setLoading(false);
  };

  return user ? (
    <div>
      <h1>Your NFTs</h1>
      <Grid loading={loading} nfts={myNFTs} />
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
