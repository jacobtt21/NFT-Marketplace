//pages/sitemap.xml.js
import { abi } from '../contracts/abi';
import Web3 from 'web3';

const EXTERNAL_DATA_URL = 'https://www.oustro.xyz';
const EXTERNAL_DATA_URL_S = 'https://www.oustro.xyz/s';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
          <loc>https://www.oustro.xyz/showcase</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/about</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/login</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/faq</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/code</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/legal</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/library</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/mint</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.oustro.xyz/profile</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      ${posts.map(({ id }) => {
        return `
          <url>
            <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
          </url>
          <url>
            <loc>${`${EXTERNAL_DATA_URL_S}/${id}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
          </url>
        `;
      }).join('')}
    </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/60bdb9f399554311a48b69ff2faefc8f'));
  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const tIndex = await contract.methods.getIndex().call();
  let array = []
  var i = 1;
  for (i = 1; i < parseInt(tIndex); ++i) {
    var dict = {
      "id": i
    };
    array.push(dict);
  }

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(array);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

