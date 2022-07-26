import { useContext } from 'react';
import { ImgContext } from '../lib/ImgContext';
import { TitleContext } from '../lib/TitleContext';

const Meta = () => {
  console.log(useContext(ImgContext))
  return (
    <>
      <meta name="title" content="Oustro" />
      <meta name="description" content="We all have a story, tell yours" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.oustro.xyz/showcase" />
      <meta property="og:title" content={useContext(TitleContext)} />
      <meta property="og:description" content="We all have a story, tell yours" />
      <meta property="og:image" content={useContext(ImgContext)} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.oustro.xyz/showcase" />
      <meta property="twitter:title" content={useContext(TitleContext)} />
      <meta property="twitter:description" content="We all have a story, tell yours" />
      <meta property="twitter:image" content={useContext(ImgContext)} />
    </>
  );
};

export default Meta;

