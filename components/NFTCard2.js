import Link from 'next/link';
import { TextButton, MonochromeIcons, useToast } from '@magiclabs/ui';
import next from 'next';


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
      <Link href={going ? {pathname: "/s/[id]", query: { id: nft.tokenID }} : "#"}>
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
          <div className="name">
            <Link href={{pathname: "/s/[id]", query: { id: nft.tokenID }}}>
              <TextButton
              color="tertiary"
              outline="none"
              >
                {nft.name}
              </TextButton>
            </Link>
          </div>
          <div className="name">
            <Link href={{pathname: "/s/[id]", query: { id: nft.tokenID }}}>
              <TextButton
              trailingIcon={MonochromeIcons.SuccessFilled}
              outline="none"
              >
                {nft.creator}
              </TextButton>
            </Link>
          </div>
        </div>
      </Link>
      <style>{`
        .card {
          // border-radius: 20px;
          // padding: 15px;
          // box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 16px,
          //   rgba(0, 0, 0, 0.05) 0px 0px 16px;
          transition: 0.2s;
        }

        .nft-img:hover {
          -webkit-filter: brightness(87%);
          box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 16px,
          rgba(0, 0, 0, 0.1) 0px 0px 16px;
          transition: 0.2s;
        }

        .nft-img-container {
          margin-top: 10px;
          min-width: 200px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nft-img {
          max-width: 300px;
          max-height: 300px;
          cursor: pointer;
          border-radius: 15px;
          transition: 0.2s;
        }

        .name {
          margin-top: 3px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
