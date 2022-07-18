import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';
import { CallToAction } from '@magiclabs/ui';
import Head from 'next/head';

export default function Index() {
  const [user] = useContext(UserContext);
  const [allTPNFTs, setAllTPNFTs] = useState([]);
  const [allTPPrices, setAllTPPrices] = useState();
  const [allTPNums, setAllTPNums] = useState();
  const [allTPStars, setAllTPStars] = useState();
  const [allTPStatus, setAllTPStatus] = useState();
  const [allTPVerify, setAllTPVerify] = useState();
  const [allOONFTs, setAllOONFTs] = useState([]);
  const [allOOPrices, setAllOOPrices] = useState();
  const [allOONums, setAllOONums] = useState();
  const [allOOStars, setAllOOStars] = useState();
  const [allOOStatus, setAllOOStatus] = useState();
  const [allOOVerify, setAllOOVerify] = useState();
  const [allRGNFTs, setAllRGNFTs] = useState([]);
  const [allRGPrices, setAllRGPrices] = useState();
  const [allRGNums, setAllRGNums] = useState();
  const [allRGStars, setAllRGStars] = useState();
  const [allRGStatus, setAllRGStatus] = useState();
  const [allRGVerify, setAllRGVerify] = useState();
  const [allNFTs, setAllNFTs] = useState([]);
  const [allPrices, setAllPrices] = useState();
  const [allNums, setAllNums] = useState();
  const [allStars, setAllStars] = useState();
  const [allStatus, setAllStatus] = useState();
  const [allVerify, setAllVerify] = useState();
  const [genre, setGenre] = useState("...");
  const [setter, setSetter] = useState("1");
  const [loading, setLoading] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    contract.methods.name().call();
    getNFTs();
  }, []);

  // Get array of all token URI's stored in contract
  // Each URI is an IPFS url containing json metadata about the NFT, such as image and name
  const getNFTs = async () => {
    setLoading(true);

    const uriList = await contract.methods.getEverything().call();

    let pricesTP = [];
    let onMarketTP = [];
    let numsTP = [];
    let starsTP = [];
    let nftsTP = [];
    let verifiedTP = [];
    
    let pricesOO = [];
    let onMarketOO = [];
    let numsOO = [];
    let starsOO = [];
    let nftsOO = [];
    let verifiedOO = [];

    let pricesRG = [];
    let onMarketRG = [];
    let numsRG = [];
    let starsRG = [];
    let nftsRG = [];
    let verifiedRG = [];

    var j = 0;
    var i = 0;
    var k = 0;
    var m = 0;
    for (i = 0; i < uriList.length; ++i) {
      if (uriList[uriList.length - 1 - i][8]) {
        const response = await fetch(uriList[uriList.length - 1 - i][0]);
        const data = await response.json();
        if (k < 4) {
          if (uriList[uriList.length - 1 - i][4] === "5") {
          pricesTP.push(uriList[uriList.length - 1 - i][2]);
          verifiedTP.push(uriList[uriList.length - 1 - i][7]);
          onMarketTP.push(uriList[uriList.length - 1 - i][6]);
          numsTP.push(uriList[uriList.length - 1 - i][5])
          starsTP.push(uriList[uriList.length - 1 - i][4]);
          nftsTP.push(data);
          k += 1;
          }
        }
        if (m < 4) {
          if (data["creator"] === "0x8c17bB1862B31f302e4c25bf364431f0a39614B1") {
            pricesOO.push(uriList[uriList.length - 1 - i][2]);
            verifiedOO.push(uriList[uriList.length - 1 - i][7]);
            onMarketOO.push(uriList[uriList.length - 1 - i][6]);
            numsOO.push(uriList[uriList.length - 1 - i][5])
            starsOO.push(uriList[uriList.length - 1 - i][4]);
            nftsOO.push(data);
            m += 1;
          }
        }
        if ( j < 4) {
          pricesRG.push(uriList[uriList.length - 1 - i][2]);
          verifiedRG.push(uriList[uriList.length - 1 - i][7]);
          onMarketRG.push(uriList[uriList.length - 1 - i][6]);
          numsRG.push(uriList[uriList.length - 1 - i][5])
          starsRG.push(uriList[uriList.length - 1 - i][4]);
          nftsRG.push(data);
          j += 1;
        }
      }
    }

    setAllTPNFTs(nftsTP);
    setAllTPPrices(pricesTP);
    setAllTPStatus(onMarketTP);
    setAllTPNums(numsTP);
    setAllTPStars(starsTP);
    setAllTPVerify(verifiedTP);

    setAllOONFTs(nftsOO);
    setAllOOPrices(pricesOO);
    setAllOOStatus(onMarketOO);
    setAllOONums(numsOO);
    setAllOOStars(starsOO);
    setAllOOVerify(verifiedOO);

    setAllRGNFTs(nftsRG);
    setAllRGPrices(pricesRG);
    setAllRGStatus(onMarketRG);
    setAllRGNums(numsRG);
    setAllRGStars(starsRG);
    setAllRGVerify(verifiedRG);

    setAllNFTs(nftsRG);
    setAllPrices(pricesRG);
    setAllStatus(onMarketRG);
    setAllNums(numsRG);
    setAllStars(starsRG);
    setAllVerify(verifiedRG);

    setLoading(false);
  };

  async function outputG(type) {
    setGenre(type);
    const uriList = await contract.methods.getEverything().call();

    console.log(uriList)

    let prices = [];
    let onMarket = [];
    let nums = [];
    let stars = [];
    let nfts = [];
    let verified = [];

    var i = 0;
    var j = 0;
    for (i = 0; i < uriList.length; ++i) {
      if (j < 4) {
        const response = await fetch(uriList[i][0]);
        const data = await response.json();
        if (data["genre"] === type) {
          prices.push(uriList[i][2]);
          verified.push(uriList[i][7]);
          onMarket.push(uriList[i][6]);
          nums.push(uriList[i][5])
          stars.push(uriList[i][4]);
          nfts.push(data);
          j += 1;
        }
      }
    }

    setAllNFTs(nfts);
    setAllPrices(prices);
    setAllStatus(onMarket);
    setAllNums(nums);
    setAllStars(stars);
    setAllVerify(verified);
    setSetter("2")
  }

  return user ? (
    <div>
      <Head>
        <title>For You | Oustro</title>
        <meta name="description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
        <h4 className='what'>Top Picks</h4>
        <h3>Here's what hot right now</h3>
        <Grid loading={loading} nfts={allTPNFTs} prices={allTPPrices} statuses={allTPStatus} type={true} stars={allTPStars} nums={allTPNums} go={true} takeAway={true} checkmark={allTPVerify} />
        <h2>Hey look where I find myself, the {genre} section!</h2>
        <CallToAction
        style={{
          margin: 10
        }}
        color="primary"
        size='sm'
        onClick={() => outputG("Publication")}
        >
          Publication
        </CallToAction>
        <CallToAction
        style={{
          margin: 10
        }}
        color="primary"
        size='sm'
        onClick={() => outputG("Poetry")}
        >
          Poetry
        </CallToAction>
        <CallToAction
        style={{
          margin: 10
        }}
        color="primary"
        size='sm'
        onClick={() => outputG("Story")}
        >
          Story
        </CallToAction>
        <CallToAction
        style={{
          margin: 10
        }}
        color="primary"
        size='sm'
        onClick={() => outputG("Scripts")}
        >
          Scripts
        </CallToAction>
        <CallToAction
        style={{
          margin: 10
        }}
        color="primary"
        size='sm'
        onClick={() => outputG("Academia")}
        >
          Academia
        </CallToAction>
        {setter === "1" ? (
          <div className='hold'></div>
        ) : (
          <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={true} takeAway={true} checkmark={allVerify} />
        )}
        <h2>Oustro Originals</h2>
        <h3>From us, to you, for you</h3>
        <Grid loading={loading} nfts={allOONFTs} prices={allOOPrices} statuses={allOOStatus} type={true} stars={allOOStars} nums={allOONums} go={true} takeAway={true} checkmark={allOOVerify} />
        <h2>Random Gems</h2>
        <h3>Why not right? Who knows, you might find an all time favorite</h3>
        <Grid loading={loading} nfts={allRGNFTs} prices={allRGPrices} statuses={allRGStatus} type={true} stars={allRGStars} nums={allRGNums} go={true} takeAway={true} checkmark={allRGVerify} />
        <style>{`
            CallToAction {
              margin: 10px;
            }
            .hold {
              min-height: 150px;
            }
            .what {
              margin: 20px;
            }
            h1 {
                font-weight: bold;
                font-size: 28px;
                margin: 20px;
                min-height: 28px;
            }
            h2 {
                font-weight: bold;
                font-size: 20px;
                margin-top: -80px;
                margin-left: 20px;
                min-height: 28px;
            }
            h4 {
                font-weight: bold;
                font-size: 20px;
                margin-top: -10px;
                margin-left: 20px;
                min-height: 28px;
            }
            h3 {
                font-weight: bold;
                font-size: 15px;
                margin-left: 20px;
                min-height: 28px;
            }
            p {
                margin: 20px;
                min-height: 28px;
            }
        `}</style>
    </div>
  ) : (
    <>
    <Loading />
    </>
  );
}