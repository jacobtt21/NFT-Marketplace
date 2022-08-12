import React, { useEffect, useContext} from 'react';
import { UserContext } from '../../lib/UserContext';
import Loading from '../../components/Loading';
import Head from 'next/head';
import Link from 'next/link';

export default function Index() {
  const [user] = useContext(UserContext);

  const num_1 = {
    'name' : "OustroForAll",
    'bio' : 'OustroForAll highlights the fact that everyone and everything is welcome on Oustro.',
    'img' : 'img'
  }

  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);

  return user ? (
    <div>
      <Head>
        <title>Community Leaderboard | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <h4>Community Leaderboard</h4>
      <p>Oustro's most popular communities at the moment.</p>
        <div className='card1'>
          <Link href={{pathname: '/community/[cname]', query: { cname: num_1.name }}}>
            <div className='align'>
              <div>
                <img
                src='https://oustro.infura-ipfs.io/ipfs/QmPbPr4rjozjv7RRcFRbM8VSdtQYNfFVn97ERMY8ejUEAY'
                className='img-top'
                />
              </div>
              <div>
                <h1>{num_1.name}</h1>
                <h2>{num_1.bio}</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className='align'>
          <div className='card2'>
            <Link href={{pathname: '/community/[cname]', query: { cname: num_1.name }}}>
              <div className='align'>
                <div>
                  <img
                  src='https://oustro.infura-ipfs.io/ipfs/QmPbPr4rjozjv7RRcFRbM8VSdtQYNfFVn97ERMY8ejUEAY'
                  className='img-top'
                  />
                </div>
                <div>
                  <h1>{num_1.name}</h1>
                  <h2>{num_1.bio}</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className='card3'>
            <Link href={{pathname: '/community/[cname]', query: { cname: num_1.name }}}>
              <div className='align'>
                <div>
                  <img
                  src='https://oustro.infura-ipfs.io/ipfs/QmPbPr4rjozjv7RRcFRbM8VSdtQYNfFVn97ERMY8ejUEAY'
                  className='img-top'
                  />
                </div>
                <div>
                  <h1>{num_1.name}</h1>
                  <h2>{num_1.bio}</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      <style jsx>{`
        h2 {
          line-height: 1.6;
        }
        .img-top {
          max-width: 200px;
          max-height: 200px;
          cursor: pointer;
          border-radius: 15px;
        }
        h1 {
          font-weight: bold;
          font-size: 30px;
          margin-bottom: 30px;
        }
        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }
        .card1 {
          text-align: center;
          margin: auto;
          width: 500px;
          margin-top: 40px;
          border-radius: 20px;
          box-shadow: #FFD700 0px 0px 10px, #FFD700 0px 0px 10px;
          transition: 0.2s;
          margin-bottom: 15px;
        }
        .card1:hover {
          box-shadow: #FFD700 0px 0px 16px, #FFD700 0px 0px 16px;
        }
        .card2 {
          text-align: center;
          margin: auto;
          width: 500px;
          margin-top: 40px;
          border-radius: 20px;
          box-shadow: #6851FF 0px 0px 10px, #6851FF 0px 0px 10px;
          transition: 0.2s;
        }
        .card2:hover {
          box-shadow: #6851FF 0px 0px 16px, #6851FF 0px 0px 16px;
        }
        .card3 {
          text-align: center;
          margin: auto;
          width: 500px;
          margin-top: 90px;
          border-radius: 20px;
          box-shadow: #CD7F32 0px 0px 10px, #CD7F32 0px 0px 10px;
          transition: 0.2s;
        }
        .card3:hover {
          box-shadow: #CD7F32 0px 0px 16px, #CD7F32 0px 0px 16px;
        }
        
        h4 {
          margin-left: 20px;
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        p {
          margin-left: 20px;
          margin-bottom: 15px;
        }
      
      `}</style>
    </div>
  ) : (
    <>
    <Loading />
    </>
  );
}