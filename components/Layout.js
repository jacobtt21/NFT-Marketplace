import Head from 'next/head';
import Header from './Header';

const Layout = (props) => (
  <>
    <Head>
      <title>Oustro</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, width=device-width, height=device-height" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta property="og:url" content="https://www.oustro.xyz/" />
      <meta property="og:title" content="Oustro" />
      <meta property="og:image" content="https://www.oustro.xyz/favicon.ico" />
      <meta property="og:site_name" content="Oustro" />
      <meta property="og:description" content="Oustro Inc is where change happens" />
      <meta itemprop="name" content="Oustro" />
      <meta itemprop="description" content="Oustro Inc is where change happens" />
      <meta itemprop="image" content="https://www.oustro.xyz/favicon.ico" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Oustro" />
      <meta name="twitter:description" content="Oustro Inc is where change happens" />
      <meta name="twitter:image" content="https://www.oustro.xyz/favicon.ico" />

      <meta name="description" content="Oustro Inc is where change happens" />
      <meta name="keywords" content="Oustro, NFT, Venture Capital, PDF, writing, Publishing, NFTS, WAGMI, Crypto, ETH, Bitcoin, Google, Openseas, Ethereum" />
      <link rel="canonical" href="https://www.oustro.xyz/" />
      <link rel="apple-touch-icon" sizes="57x57" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="60x60" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="72x72" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="76x76" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="114x114" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="120x120" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="144x144" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="152x152" href="/oustro_logo.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/oustro_logo.svg" />
    </Head>
    <main>
      <div className="container">{props.children}</div>
    </main>
    <style jsx global>{`
      * {
        font-family: Verdana;
        outline: none;
      }
      body {
        min-height: 100vh;
      }
      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 10px;
      }
    `}</style>
  </>
);

export default Layout;
