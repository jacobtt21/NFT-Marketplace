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
    <form noValidate action="" role="search">
      <TextField
        placeholder='Ask a question'
        size='md'
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
      />
    </form>
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
