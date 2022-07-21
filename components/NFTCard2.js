import { useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link'
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { TextField, CallToAction, TextButton, MonochromeIcons } from '@magiclabs/ui';
import { useRouter } from 'next/router'


export default function NFTCard({ nft }) {
  return (
    <>
      <Link href={{pathname: "/s/[id]", query: { id: nft.tokenID }}}>
          <div className="card">
            <div className="nft-img-container">
              <img
              src={nft.image}
              width={300}
              className="nft-img"
              onError={(e) => (e.target.src = '/fallback.jpeg')}
              />
            </div>
              <div className="name">
                <Link href={{pathname: "/s/[id]", query: { id: nft.tokenID }}}>
                  <TextButton
                  leadingIcon={MonochromeIcons.SuccessFilled}
                  color="primary"
                  outline="none"
                  >
                    {nft.name}
                  </TextButton>
                </Link>
              </div>
            <div className="name">created by {nft.creator.substring(0, 6)}..{nft.creator.substring(38)}</div>
          </div>
        </Link>
      <style>{`
        .card {
          border-radius: 20px;
          padding: 15px;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 16px,
            rgba(0, 0, 0, 0.05) 0px 0px 16px;
          transition: 0.2s;
        }

        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 16px,
            rgba(0, 0, 0, 0.1) 0px 0px 16px;
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
          max-width: 200px;
          max-height: 200px;
          cursor: pointer;
          border-radius: 15px;
        }

        .name {
          margin-top: 10px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
