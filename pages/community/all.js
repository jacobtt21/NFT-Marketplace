import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../lib/UserContext';
import { web3 } from '../../lib/magic';
import { abiC } from '../../contracts/abiC';
import Grid from '../../components/CGrid';
import Loading from '../../components/Loading';
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
  const [comms, setComms] = useState([]);
  const [loading, setLoading] = useState(false);

  const commAddress = process.env.NEXT_PUBLIC_COMM_ADDRESS;
  const contractComm = new web3.eth.Contract(abiC, commAddress);

  useEffect(() => {
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
          placeholder='Search for a specific community'
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

    const uriList = await contractComm.methods.getAllCommunities().call();
    let most = [];
    for (var i = 0; i < uriList.length; ++i) {
      if (uriList[i].allow) {
        most.push(uriList[i]);
      }
    }
    setComms(most);

    setLoading(false);
  };

  return user ? (
    <div>
      <Head>
        <title>All Communities | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <h1>Communities on Oustro</h1>
      <p>Find your people and see what they have to share.</p>
      <InstantSearch searchClient={searchClient} indexName="OustroComms">
        <CustomSearchBox />
      </InstantSearch>
      <Grid loading={loading} comms={comms} />
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