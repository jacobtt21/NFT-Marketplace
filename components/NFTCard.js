import Link from 'next/link'

export default function NFTCard({ nft }) {
  return (
    <>
      <div className="card">
        <Link href={nft.work}>
          <div className="nft-img-container">
            <img
            src={nft.image}
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />
          </div>
        </Link>
        <div className="name">{nft.name}</div>
        <div className="name">by</div>
        <div className="name">{nft.creator.substring(0, 6)}..{nft.creator.substring(38)}</div>
      </div>
      <style>{`
        .card {
          border-radius: 8px;
          padding: 15px;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 16px,
            rgba(0, 0, 0, 0.05) 0px 0px 16px;
        }

        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px,
            rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }

        .nft-img-container {
          min-width: 200px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nft-img {
          max-width: 200px;
          max-height: 200px;
          cursor: pointer;
          border-radius: 8px;
        }

        .name {
          margin-top: 10px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
