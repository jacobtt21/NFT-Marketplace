import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';

export default function Index() {
  const [user] = useContext(UserContext);
  const [allNFTs, setAllNFTs] = useState([]);
  const [collectionName, setCollectionName] = useState();
  const [loading, setLoading] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    contract.methods.name().call().then(setCollectionName);
    getNFTs();
  }, []);

  // Get array of all token URI's stored in contract
  // Each URI is an IPFS url containing json metadata about the NFT, such as image and name
  const getNFTs = async () => {
    setLoading(true);
    const uriList = await contract.methods.getNFTs().call();

    let nfts = [];

    // Call IPFS url for metadata of each NFT (json object containing name & image)
    await Promise.all(
      uriList.map(async (uri) => {
        const response = await fetch(uri);
        const data = await response.json();
        nfts.push(data);
      })
    );

    setAllNFTs(nfts);
    setLoading(false);
  };

  return user ? (
    <div>
      <h1></h1>
      <Grid loading={loading} nfts={allNFTs} />
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
