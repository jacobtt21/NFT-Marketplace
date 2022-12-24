import Link from 'next/link';
import { TextButton, MonochromeIcons, useToast, CallToAction } from '@magiclabs/ui';

export default function NFTCard({ nft, going }) {
  const { createToast } = useToast();

  const nextWeek = async () => {
    createToast({
      message: 'Comeback next week to check out these NFTs!',
      type: 'success',
      lifespan: 2000,
    });
  };

  const nextWeek2 = async () => {
    
  };

  return (
    <>
        <div className="card">
          <div className="nft-img-container">
            <img
            src={nft.image}
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            alt={nft.name}
            onClick={!going ? nextWeek : nextWeek2}
            />
          </div>
          <div className='align'>
            <div>
              <div className='name'>
                <h1 className='nameWords'>
                  {nft.name}
                </h1>
              </div>
              <div className="name">
                <Link href={{pathname: "/u/[id]", query: { id: nft.creatorAd }}}>
                  <TextButton
                  trailingIcon={MonochromeIcons.SuccessFilled}
                  outline="none"
                  >
                    {nft.creator}
                  </TextButton>
                </Link>
              </div>
            </div>
            <div className="rating">
              <Link href={{pathname: '/s/[id]', query: { id: nft.tokenID }}}>
                <CallToAction>
                  &rarr;
                </CallToAction>
              </Link>
          </div>
          </div>
        </div>
      <style>{`
        .nft-img:hover {
          -webkit-filter: brightness(87%);
          box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 16px,
          rgba(0, 0, 0, 0.1) 0px 0px 16px;
          transition: 0.2s;
        }

        .nft-img-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          margin-bottom: 20px;
        }

        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 4fr 1fr;
          margin-bottom: 30px;
          margin-top: -10px;
          align-items: center;
        }

        .nft-img {
          width: 300px;
          height: 300px;
          cursor: pointer;
          border-radius: 15px;
          transition: 0.2s;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .name {
          margin-top:-20px;
          text-align: left;
        }

        .rating {
          margin-right: 10px;
          text-align: right;
        }

        h1 {
          font-weight: bold;
          font-size: 28px;
          margin: 20px;
          min-height: 28px;
        }

        .nameWords {
          line-height: 1.6;
          margin-left: 0px;
          font-size: 15px;
        }
      `}</style>
    </>
  );
}
