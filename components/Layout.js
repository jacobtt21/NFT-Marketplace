import Head from 'next/head';
import Header from './Header';

const Layout = (props) => (
  <>
    <Head>
      <title>Oustro</title>
      <link rel="icon" href="/favicon.ico" />

      <meta name="title" content="Oustro | The first NFT marketplace for NFTs that aren't just images." />
      <meta name="description" content="The world's only NFT marketplace for filmmakers, musicians, academics, artists, and more." />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.oustro.xyz/showcase" />
      <meta property="og:title" content="Oustro | The first NFT marketplace for NFTs that aren't just images." />
      <meta property="og:description" content="The world's only NFT marketplace for filmmakers, musicians, academics, artists, and more." />
      <meta property="og:image" content="https://i.imgur.com/pkr0a0b.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.oustro.xyz/showcase" />
      <meta property="twitter:title" content="Oustro | The first NFT marketplace for NFTs that aren't just images." />
      <meta property="twitter:description" content="The world's only NFT marketplace for filmmakers, musicians, academics, artists, and more." />
      <meta property="twitter:image" content="https://i.imgur.com/pkr0a0b.png" />
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
