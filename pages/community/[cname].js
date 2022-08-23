import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../lib/UserContext';
import { web3 } from '../../lib/magic';
import { abi } from '../../contracts/abi';
import { abiC } from '../../contracts/abiC';
import Grid from '../../components/Grid';
import Loading from '../../components/Loading';
import { CallToAction, MonochromeIcons } from '@magiclabs/ui';
import Link from 'next/link'
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Index() {
  const [user] = useContext(UserContext);
  const [allNFTs, setAllNFTs] = useState([]);
  const [comm, setComm] = useState();
  const [allPrices, setAllPrices] = useState();
  const [allNums, setAllNums] = useState();
  const [allStars, setAllStars] = useState();
  const [allStatus, setAllStatus] = useState();
  const [allVerify, setAllVerify] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var route = false;

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const commAddress = process.env.NEXT_PUBLIC_COMM_ADDRESS;
  const contractComm = new web3.eth.Contract(abiC, commAddress);

  useEffect(() => {
    if (!router.query.cname) {
      return;
    }
    getNFTs();
  }, [router.query.cname]);

  // Get array of all token URI's stored in contract
  // Each URI is an IPFS url containing json metadata about the NFT, such as image and name
  const getNFTs = async () => {
    setLoading(true);

    const uriList = await contract.methods.getEverything().call();

    let prices = [];
    let onMarket = [];
    let nums = [];
    let stars = [];
    let nfts = [];
    let verified = [];

    var i = 0;
    for (i = uriList.length - 1; i >= 0; --i) {
      const response = await fetch(uriList[i][0]);
      const data = await response.json();
      if (uriList[i][8] && data.comm) {
        if ((data.comm).toUpperCase() === (router.query.cname).toUpperCase()) {
          prices.push(uriList[i][2]);
          verified.push(uriList[i][7]);
          onMarket.push(uriList[i][6]);
          nums.push(uriList[i][5])
          stars.push(uriList[i][4]);
          nfts.push(data);
        }
      }
    }

    const cList = await contractComm.methods.getCommByName(router.query.cname).call();
    setComm(cList)

    setAllNFTs(nfts);
    setAllPrices(prices);
    setAllStatus(onMarket);
    setAllNums(nums);
    setAllStars(stars);
    setAllVerify(verified);
    setLoading(false);
  };

  if (user) {
    route = true;
  }

  return comm ? (
    <div>
      <Head>
        <title>{router.query.cname} | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <div className='info'>
      <img className="cPics" 
        src={comm.cPic} 
      />
      <h1>
        {router.query.cname} &nbsp;&nbsp;
        <Link href={{pathname: '/mint', query: { comm: router.query.cname }}}>
          <CallToAction
          leadingIcon={MonochromeIcons.Add}
          >
            Contribute
          </CallToAction>
        </Link>
      </h1>
      <p>{comm.bio}</p>
      </div>
      <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={route} takeAway={true} checkmark={allVerify} />
      <style>{`
        .cPics {
          border-radius: 15px;
          max-width: 200px;
          max-height: 200px;
          margin-top: 20px;
          margin: 20px;
        }
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
        .info {
          text-align: center;
        }
        `}</style>
    </div>
  ) : (
    <>
      <Loading />
    </>
  );
}