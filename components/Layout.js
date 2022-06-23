import Head from 'next/head';
import Header from './Header';
import Script from 'next/script'

const Layout = (props) => (
  <>
    <Head>
      <title>Oustro</title>
      <link rel="icon" href="/favicon.ico" />

      <meta name="title" content="Oustro" />
      <meta name="description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://oustro.xyz" />
      <meta property="og:title" content="Oustro" />
      <meta property="og:description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
      <meta property="og:image" content="https://i.imgur.com/uQRUzpt.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://oustro.xyz" />
      <meta property="twitter:title" content="Oustro" />
      <meta property="twitter:description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
      <meta property="twitter:image" content="https://i.imgur.com/uQRUzpt.png" />
      <Script src="//static.ads-twitter.com/oct.js" type="text/javascript"></Script>
      <Script type="text/javascript">{`twttr.conversion.trackPid('o96np', { tw_sale_amount: 0, tw_order_quantity: 0 });`}</Script>
    </Head>
    <Header />
    <main>
      <div className="container">{props.children}</div>
    </main>
    <style jsx global>{`
      html, body {
        font-family: 'Poppins', sans-serif;
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
