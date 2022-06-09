import Head from 'next/head';
import Header from './Header';

const Layout = (props) => (
  <>
    <Head>
      <title>Oustro</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="Oustro" key="ogtitle" />
      <meta property="og:description" content="Where change happens" key="ogdesc" />
      <meta
          property="og:image"
          content="/oustro_logo.svg"
          key="ogimage"
      />
      <meta
          property="og:site_name"
          content="Oustro"
          key="ogsitename"
      />
      <meta
          property="og:url"
          content="https://oustro.xyz"
          key="ogurl"
      />
       <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Oustro" />
      <meta name="twitter:description" content="NFTs for use" />
      <meta
          name="twitter:image"
          content="https://www.oustro.xyz/oustro_logo.svg"
        />

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
