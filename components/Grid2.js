import NFTCard from './NFTCard2';
import Link from 'next/link';
import { Skeleton, TextButton } from '@magiclabs/ui';

export default function Grid({ nfts, loading, go }) {
  if (typeof window !== 'undefined') {
    // detect window screen width function
    if (window.innerWidth < 1300) {
      var i = 0;
      let nfts3 = []
      for (i = 0; i < 3; ++i) {
        nfts3.push(nfts[i])
      }
      nfts = nfts3;
    }
  }
  
  return (
    <>
      <div className="grid">
        {/* If loading NFTs, display 4 placeholder loading images */}
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, i) => {
              return (
                <div key={i}>
                  <Skeleton
                    style={{
                      height: 240,
                      width: 300,
                    }}
                  />
                </div>
              );
            })
        ) : nfts.length > 0 ? (
          nfts.map((nft, i) => {
            return (
              <div key={i}>
                <NFTCard nft={nft} going={go}/>
              </div>
            );
          })
        ) : (
          <div>
            There's nothing here!
          </div>
        )}
      </div>
      <style>{`
        .grid {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: 1fr;
          margin-top: 30px;
          margin-bottom: 100px;
        }

        @media (min-width: 660px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 980px) {
          .grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        @media (min-width: 1300px) {
          .grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
        }
      `}</style>
    </>
  );
}
