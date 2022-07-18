import Head from 'next/head';
import Header from './Header';
import Script from 'next/script'

const Layout = (props) => (
  <>
    <Head>
      <title>Oustro</title>
      <link rel="icon" href="/favicon.ico" />

      <meta name="title" content="Oustro" />
      <meta name="description" content="We all have a story, tell yours" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.oustro.xyz/showcase" />
      <meta property="og:title" content="Oustro" />
      <meta property="og:description" content="We all have a story, tell yours" />
      <meta property="og:image" content="https://i.imgur.com/TKVuIhF.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.oustro.xyz/showcase" />
      <meta property="twitter:title" content="Oustro" />
      <meta property="twitter:description" content="We all have a story, tell yours" />
      <meta property="twitter:image" content="https://i.imgur.com/TKVuIhF.png" />
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
