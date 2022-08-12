import NFTCard from './Ccard';
import Link from 'next/link';
import { Skeleton, TextButton } from '@magiclabs/ui';

export default function Grid({ loading, comms }) {
  return (
    <>
      <div className="grid">
        {loading ? (
          Array(2)
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
        ) : comms.length > 0 ? (
          comms.slice(0).reverse().map((comm, i) => {
            return (
              <div key={i}>
                <NFTCard comm={comm} />
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
          padding: 30px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr;
          margin-bottom: 100px;
        }

        @media (min-width: 1300px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </>
  );
}
