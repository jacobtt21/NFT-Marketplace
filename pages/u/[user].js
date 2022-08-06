import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../../lib/UserContext';
import { web3 } from '../../lib/magic';
import { abi } from '../../contracts/abi';
import Grid from '../../components/Grid';
import Loading from '../../components/Loading';
import { customNames } from '../../lib/users';

export default function Index() {
  const [user] = useContext(UserContext);
  const [userName, setUsername] = useState('');
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
    setUsername('');
    getMyNFTs();
  }, [router.query.user]);

  const getMyNFTs = async () => {
    var i;
    for (i = 0; i < customNames.length; ++i) {
      if (customNames[i].address == router.query.user) {
        setUsername(customNames[i].username);
        break;
      }
    }
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
      {userName ? (
        <>
          <h1>{userName}</h1>
        </>
      ) : (
        <>
          <p>{router.query.user}</p>
        </>
      )}
      <Grid loading={loading} nfts={myNFTs} prices={myPrices} statuses={myStatus} type={true} stars={myStars} nums={myNums} checkmark={myVerify} go={route} takeAway={true} />
      <style>{`
        h1 {
          font-weight: bold;
          font-size: 68px;
          margin-left: 20px;
          margin-top: 55px;
          margin-bottom: 25px;
        }
        h2 {
          font-weight: bold;
          font-size: 68px;
          margin-left: 20px;
          margin-top: 55px;
          margin-bottom: 25px;
        }
        p {
          min-height: 28px;
          font-size: 28px;
          margin-left: 20px;
          margin-top: 25px;
          margin-bottom: 25px;
        }
      `}</style>
    </div>
  ) : (
    <Loading />
  );
}
