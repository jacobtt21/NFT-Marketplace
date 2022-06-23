import NFTCard from './NFTCard';
import Link from 'next/link';
import { Skeleton, TextButton } from '@magiclabs/ui';

export default function Grid({ nfts, prices, statuses, loading, type, stars, nums, go, takeAway, checkmark }) {
  return (
    <>
      <div className="grid">
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
                <NFTCard nft={nft} price={prices[i]} status={statuses[i]} types={type} star={stars[i]} num={nums[i]} check={checkmark[i]} going={go} take={takeAway} />
              </div>
            );
          })
        ) : (
          <div>
            Click{' '}
            <Link href="/mint">
              <TextButton color="primary" size="md">
                here
              </TextButton>
            </Link>{' '}
            to publish the first
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
