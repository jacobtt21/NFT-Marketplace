import { MonochromeIcons, TextButton, TextField } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";

export default function About() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  );

  const Hit = ({ hit }) => (
    <>
      <div className='cards' id={hit.fields.tag.en}>
        <h1>{hit.fields.title.en}</h1>
        <h2>{hit.fields.answer.en}</h2>
      </div>
      <style jsx>{`
        h1 {
          font-size: 30px;
          font-weight: bold;
        }
        h2 {
          margin-top: 30px;
          line-height: 25px;
        }
        .cards {
          margin-top: 40px;
          padding: 30px;
          border-bottom:2px solid #f0f0f0;
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
        placeholder="Ask a question, any question, and we'll do our best to answer">
        </input>
      </form>
      <style jsx>{`
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

  return (
    <>
      <Head>
        <title>FAQs | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/about"
          key="canonical"
        />
      </Head>
      <div className='landing'>
        <div className='align'>
          <div className='toc'>
            <h5>More places that might have answers</h5>
            <h6>
              <Link
              href="/"
              >
                <TextButton>
                  Blog
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="https://oustro.zendesk.com/hc/en-us"
              >
                <TextButton>
                  Help center
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="https://oustro.statuspage.io/"
              >
                <TextButton>
                  Status
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="/legal"
              >
                <TextButton>
                  Privacy policy
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="/legal"
              >
                <TextButton>
                  Terms of service
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="/code">
                <TextButton>
                  Code of conduct
                </TextButton>
              </Link>
            </h6>
          </div>
          <div>
            <h1>FAQs</h1>
          <InstantSearch 
            searchClient={searchClient} 
            indexName="faq">
            <CustomSearchBox />
            <Hits hitComponent={Hit} />
          </InstantSearch>
          </div>
        </div>
      </div>
      <style jsx>{`
        .align {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1.5fr 6fr;
          margin-bottom: 30px;
          margin-top: 80px;
        }
        .toc {
          padding: 30px;
        }
        h1 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 50px;
          font-weight: bold;
        }
        h2 {
          font-size: 30px;
          font-weight: bold;
          margin-left: 40px;
        }
        h3 {
          font-size: 20px;
          margin-left: 40px;
          margin-bottom: 35px;
          margin-top: 15px;
        }
        h5 {
          margin-bottom: 15px;
          font-size: 20px;
          font-weight: bold;
        }
        h6 {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
