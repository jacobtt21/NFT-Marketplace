import Head from 'next/head';
import Header from './Header';

const Layout = (props) => (
  <>
    <Head>
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
