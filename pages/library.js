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
      <form  
      noValidate 
      action="" 
      role="search"
      >
        <input 
        className="nosubmit" 
        type="search" 
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)} 
        placeholder="Search for an NFT, find something special, and enjoy a new favorite">
        </input>
      </form>
      {currentRefinement ? (
        <Hits hitComponent={Hit} />
      ) : (
        <></>
      )}
      <style jsx>{`
        form { 
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .nosubmit {
          border-radius: 10px;
          border: 1px solid #555;
          width: 100%;
          font-size: 18px;
          transition: 0.2s;
          border: 1px solid #E5E5E5;
          height: 30px;
          padding: 25px 100px 25px 40px;
          background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
        }
        .nosubmit:hover {
          outline: none !important;
          border: 1px solid #6851FF;
        }
        .nosubmit:focus {
          transition: 0.2s;
          outline: none !important;
          border: 1px solid #6851FF;
          box-shadow: 0 0 1px 2px #6851FF; 
        }
      `}</style>
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
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <div className='info'>
        <h1>The Complete Oustro Library</h1>
        <p>The library card you lost isn't required to check out the work here.</p>
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