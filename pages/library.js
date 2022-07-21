import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Grid from '../components/Grid';
import Loading from '../components/Loading';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";
import { TextField } from '@magiclabs/ui';
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
      <div className="card">
        <Link href={{pathname: '/[id]', query: { id: hit.tokenID }}}>
          <div className="nft-img-container">
            <img
            src={hit.image}
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />
          </div>
        </Link>
        <div className="name">{hit.name}</div>
        <div className="name">by</div>
        <div className="name">{hit.creator}</div>
      </div>
      <style>{`
        .card {
          border-radius: 8px;
          padding: 15px;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 16px,
            rgba(0, 0, 0, 0.05) 0px 0px 16px;
        }

        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px,
            rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }

        .nft-img-container {
          min-width: 200px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nft-img {
          max-width: 200px;
          max-height: 200px;
          cursor: pointer;
          border-radius: 8px;
        }

        .name {
          margin-top: 10px;
          text-align: center;
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
      <p>Relax, you're here, take sometime to yourself and enjoy the work your peers have provided for you, completely free.</p>
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