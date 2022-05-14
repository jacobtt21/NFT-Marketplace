import Head from 'next/head';
import Header from './Header';

const Layout = (props) => (
  <>
    <Head>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@nytimes" />
    <meta name="twitter:creator" content="@SarahMaslinNir" />
    <meta name="twitter:title" content="Parade of Fans for Houston’s Funeral" />
    <meta name="twitter:description" content="NEWARK - The guest list and parade of limousines with celebrities emerging from them seemed more suited to a red carpet event in Hollywood or New York than than a gritty stretch of Sussex Avenue near the former site of the James M. Baxter Terrace public housing project here." />
    <meta name="twitter:image" content="http://graphics8.nytimes.com/images/2012/02/19/us/19whitney-span/19whitney-span-articleLarge.jpg" />
      <title>Oustro</title>
      <link rel="icon" href="/favicon.ico" />
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
