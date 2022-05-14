import Head from 'next/head';
import Header from './Header';

const Layout = (props) => (
  <>
    <Head>
      <title>Oustro</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content="@oustrohq"></meta>
      <meta property="og:title" content="Twitter is cool, Oustro is cooler"></meta>
      <meta name="twitter:description" content="Mint NFTs of actual work and sell them, all on Oustro"></meta>
      <meta name="twitter:image" content="http://example.com/myimage.jpg?4362984378"></meta>
    </Head>

    <Header />
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
