import NFTCard from './NFTCard2';
import Link from 'next/link';
import { Skeleton, TextButton } from '@magiclabs/ui';

export default function Grid({ nfts, loading }) {
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
                <NFTCard nft={nft} />
              </div>
            );
          })
        ) : (
          <div>
            No NFTs. Click{' '}
            <Link href="/mint">
              <TextButton color="primary" size="sm">
                here
              </TextButton>
            </Link>{' '}
            to mint your first and 
            <Link href="/">
              <TextButton color="primary" size="sm">
                here
              </TextButton>
            </Link>{' '}
            to buy your first!
          </div>
        )}
      </div>
      <style>{`
        .grid {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr;
          margin-bottom: 100px;
        }

        @media (min-width: 660px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 980px) {
          .grid {
            grid-template-columns: 1fr 1fr;
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
