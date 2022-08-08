import React, { useContext } from 'react';
import { UserContext } from '../../lib/UserContext';
import Loading from '../../components/Loading';
import Head from 'next/head';

export default function Index() {
  const [user] = useContext(UserContext);

  return user ? (
    <div>
      <Head>
        <title>Communities | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <h1>Communities on Oustro coming soon!</h1>
      <style jsx>{`
        h1 {
          font-size: 30px;
          margin-top: 300px;
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