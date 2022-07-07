import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { web3 } from '../../lib/magic';
import { UserContext } from '../../lib/UserContext';
import { abi } from '../../contracts/abi';
import Loading from '../../components/Loading';
import { CallToAction } from '@magiclabs/ui';
import Link from 'next/link'


export default function Index() {
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [theNFT, setTheNFT] = useState();
  const [theData, setTheData] = useState();

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    getMyNFT();
  }, [router.query.id]);

  const getMyNFT = async () => {
    const nft = await contract.methods.getNFTbyId(parseInt(router.query.id)).call();
    const response = await fetch(nft[0]);
    const data = await response.json();
    setTheNFT(data);
    setTheData(nft);
    console.log(theData)
  };

  return (
    <div>
      {theData ? (
        <>
          <div className="mint-container">
            {user ? (
              <Link href={{pathname: '/[id]', query: { id: router.query.id }}}>   
                <CallToAction
                color="primary"
                >
                  Take a closer look &rarr;
                </CallToAction>
              </Link>
            ) : (
              <>
                {theData.show ? (
                  <Link href={{pathname: '/login', query: { id: router.query.id }}}>                  
                    <CallToAction
                    color="primary"
                    >
                      Take a closer look &rarr;
                    </CallToAction>
                  </Link>
                ) : (
                  <Link href={theNFT.work}>
                    <a target="_blank">
                      <CallToAction
                      color="primary"
                      >
                        Take a closer look &rarr;
                      </CallToAction>
                    </a>
                  </Link>
                )}
              </>
            )}
            <h1>{theNFT.name}</h1>
            <h3>Price: {web3.utils.fromWei(theData.price)} ETH</h3>
            <img
            src={theNFT.image}
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />
            <br />
            <CallToAction
            color="primary"
            size="sm"
            outline="none"
            >
              {theData.rating} / 5 Rating
            </CallToAction>  
            <div className='name'>
              <h3>by {theNFT.creator.substring(0, 6)}..{theNFT.creator.substring(38)}</h3> 
            </div>
          </div>
          <style>{`
            h1 {
              font-weight: bold;
              font-size: 28px;
              margin: 20px;
              min-height: 28px;
            }
        
            .mint-container {
              max-width: 400px;
              text-align: center;
              margin: 0 auto;
              padding: 40px;
              border-radius: 8px;
              border: 1px solid #f9f9f9;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
            }

            input[type=file], .image-preview {
              display: block;
              margin: 20px 5px;
            }

            .image-preview {
              border-radius: 8px;
              max-width: 200px;
              max-height: 200px;
            }

            .nft-img {
              max-width: 400px;
              max-height: 400px;
              cursor: pointer;
              border-radius: 8px;
              margin: 25px;
            }
            .name {
              margin-top: 40px;
              text-align: center;
            }
          `}</style>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}
