import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';
import { CallToAction, TextButton, MonochromeIcons, HoverActivatedTooltip } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function Index() {
  const [user] = useContext(UserContext);
  const [allTPNFTs, setAllTPNFTs] = useState([]);
  const [allTPPrices, setAllTPPrices] = useState();
  const [allTPNums, setAllTPNums] = useState();
  const [allTPStars, setAllTPStars] = useState();
  const [allTPStatus, setAllTPStatus] = useState();
  const [allTPVerify, setAllTPVerify] = useState();
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
  const [genre, setGenre] = useState("Select What you would like to view");
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

    let pricesRG = [];
    let onMarketRG = [];
    let numsRG = [];
    let starsRG = [];
    let nftsRG = [];
    let verifiedRG = [];

    var j = 0;
    var i = 0;
    var k = 0;
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
        if (j < 8) {
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

    let prices = [];
    let onMarket = [];
    let nums = [];
    let stars = [];
    let nfts = [];
    let verified = [];

    var i = 0;
    var j = 0;
    console.log(uriList)
    for (i = uriList.length - 1; i >= 0; --i) {
      if (uriList[i][8]) {
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
        <h4 className='what'>
          <TextButton
          size='sm'
          leadingIcon={MonochromeIcons.Astronaut}>
          </TextButton>
          Oustro Editor's Choice
        </h4>
        <Link href="/9">
          <div className='banner'>
          </div>
        </Link>
        <h4 className='what1'>Top Picks</h4>
        <h3>Here's what hot right now</h3>
        <Grid loading={loading} nfts={allTPNFTs} prices={allTPPrices} statuses={allTPStatus} type={true} stars={allTPStars} nums={allTPNums} go={true} takeAway={true} checkmark={allTPVerify} />
        <h2>In the Mood for Something?</h2>
        <HoverActivatedTooltip
          arrow
          placement="left"
        >
          <HoverActivatedTooltip.Anchor>
            <TextButton
            trailingIcon={MonochromeIcons.CaretRight}
            style={{
              marginLeft: 19
            }}
            >
              {genre} 
            </TextButton>
          </HoverActivatedTooltip.Anchor>
          <HoverActivatedTooltip.Content>
            <div>
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
              <CallToAction
              style={{
                margin: 10
              }}
              color="primary"
              size='sm'
              onClick={() => outputG("Whitepaper")}
              >
                Whitepaper
              </CallToAction>
              <CallToAction
              style={{
                margin: 10
              }}
              color="primary"
              size='sm'
              onClick={() => outputG("Game")}
              >
                Game
              </CallToAction>
              <CallToAction
              style={{
                margin: 10
              }}
              color="primary"
              size='sm'
              onClick={() => outputG("Web")}
              >
                Web
              </CallToAction>
              <CallToAction
              style={{
                margin: 10
              }}
              color="primary"
              size='sm'
              onClick={() => outputG("Short Film")}
              >
                Short Film
              </CallToAction>
              <CallToAction
              style={{
                margin: 10
              }}
              color="primary"
              size='sm'
              onClick={() => outputG("Feature Film")}
              >
                Feature Film
              </CallToAction>
              <CallToAction
              style={{
                margin: 10
              }}
              color="primary"
              size='sm'
              onClick={() => outputG("Other")}
              >
                Other
              </CallToAction>
            </div>
          </HoverActivatedTooltip.Content>
        </HoverActivatedTooltip>
        {setter === "1" ? (
          <div className='hold'></div>
        ) : (
          <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={true} takeAway={true} checkmark={allVerify} />
        )}
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
              margin-top: 20px;
              font-size: 30px;
              margin-bottom: 15px;
            }
            .what1 {
              margin-top: 20px;
            }
            .banner {
              background-image: url('https://raw.githubusercontent.com/Oustro/OustroImages/0d9b2b8c938899bb79657bcad0ed7bdd8715ad99/Banner.svg');
              height: 400px;
              border-radius: 30px;
              transition: 0.2s;
            }
            .banner:hover {
              box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 16px,
              rgba(0, 0, 0, 0.1) 0px 0px 16px;
            }
            .imgs {
              border-radius: 30px;
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