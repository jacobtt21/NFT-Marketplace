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
      <meta property="og:url" content="https://www.oustro.xyz" />
      <meta property="og:title" content="Oustro" />
      <meta property="og:description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
      <meta property="og:image" content="https://i.imgur.com/ANveSlm.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.oustro.xyz" />
      <meta property="twitter:title" content="Oustro" />
      <meta property="twitter:description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
      <meta property="twitter:image" content="https://i.imgur.com/ANveSlm.png" />
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
