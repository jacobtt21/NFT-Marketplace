import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";
import { TextField, CallToAction, TextButton, MonochromeIcons } from '@magiclabs/ui';
import Link from 'next/link';
import Head from 'next/head';

export default function Index() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  );
  const [user] = useContext(UserContext);
  const [allNFTs, setAllNFTs] = useState([]);
  const [allPrices, setAllPrices] = useState();
  const [allNums, setAllNums] = useState();
  const [allStars, setAllStars] = useState();
  const [allStatus, setAllStatus] = useState();
  const [allVerify, setAllVerify] = useState();
  const [loading, setLoading] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    contract.methods.name().call();
    getNFTs();
  }, []);

  const Hit = ({ hit }) => (
    <>
      <div className='align'>
        <div
        style={{
          textAlign: 'center'
        }}
        >
          <img 
            src={hit.image}
            width="400" 
            alt="" 
          /> 
        </div>  
        <div
        style={{
          textAlign: 'center'
        }}>
          <h4>{hit.name}</h4> 
          <h6>
            Created by 
            <Link href={{pathname: "/u/[id]", query: { id: hit.creator }}}>
              <TextButton>
              {hit.creator.substring(0, 6)}...{hit.creator.substring(38)}
              </TextButton>
            </Link>
          </h6>
          <br />
          <Link href={{pathname: "/[id]", query: { id: hit.tokenID }}}>
            <CallToAction
            >
              Check out &rarr;
            </CallToAction>
          </Link>
        </div> 
      </div>
      <style jsx>{`
        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 30px;
          margin-top: 0px;
          align-items: center;
          border-bottom:1px solid #f0f0f0;
        }

        h4 {
          font-size: 40px;
          font-weight: bold;
          margin-bottom: 30px;
        }

        h6 {
          font-size: 20px;

        }

        img {
          border-radius: 15px;
        }
      `}</style>
    </>
  );

  const SearchBox = ({ currentRefinement, refine }) => (
    <>
      <form noValidate action="" role="search">
        <TextField
          placeholder='Search for a specific work'
          size='sm'
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          />
      </form>
      {currentRefinement ? (
        <Hits hitComponent={Hit} />
      ) : (
        <></>
      )}
    </>
  );  

  const CustomSearchBox = connectSearchBox(SearchBox);

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
      if (uriList[i][8]) {
        prices.push(uriList[i][2]);
        verified.push(uriList[i][7]);
        onMarket.push(uriList[i][6]);
        nums.push(uriList[i][5])
        stars.push(uriList[i][4]);
        const response = await fetch(uriList[i][0]);
        const data = await response.json();
        nfts.push(data);
      }
    }

    setAllNFTs(nfts);
    setAllPrices(prices);
    setAllStatus(onMarket);
    setAllNums(nums);
    setAllStars(stars);
    setAllVerify(verified);
    setLoading(false);
  };

  return user ? (
    <div>
      <Head>
        <title>Library | Oustro</title>
        <meta name="description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <div className='info'>
      <h1>The Complete Oustro Library</h1>
      <p>Relax and take your time enjoying some of the work by creators, library card not necessary.</p>
      </div>
      <InstantSearch searchClient={searchClient} indexName="Oustro">
        <CustomSearchBox />
      </InstantSearch>
      <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={true} takeAway={true} checkmark={allVerify} />
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
    <>
    <Loading />
    </>
  );
}