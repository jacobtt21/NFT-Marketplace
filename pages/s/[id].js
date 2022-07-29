import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { web3 } from '../../lib/magic';
import { UserContext } from '../../lib/UserContext';
import { abi } from '../../contracts/abi';
import Loading from '../../components/Loading';
import { CallToAction, TextButton, MonochromeIcons, Linkable } from '@magiclabs/ui';
import Link from 'next/link'
import Head from 'next/head';


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
  };

  return (
    <div>
      {theData ? (
        <>
          <Head>
            <title>{theNFT.name} on Oustro</title>
          </Head>
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
                      Login / Sign Up to View Further &rarr;
                    </CallToAction>
                  </Link>
                ) : (
                  <Linkable>
                    <a 
                    target="_blank"
                    href={theNFT.work}
                    >
                      <CallToAction
                      color="primary"
                      >
                        Take a closer look &rarr;
                      </CallToAction>
                    </a>
                  </Linkable>
                )}
              </>
            )}
            {theData.verify === '0' ? (
              <h1>{theNFT.name}</h1>
            ) : theData.verify === '1' ? (
              <h1>
                <Link href="/verify">
                  <TextButton
                  leadingIcon={MonochromeIcons.SuccessFilled}
                  color="primary"
                  outline="none"
                  >
                  </TextButton>
                </Link>
                {theNFT.name}
              </h1>
            ) : theData.verify === '2' ? (
              <h1>
                <Link href="/mistake">
                  <TextButton
                  leadingIcon={MonochromeIcons.AsteriskBold}
                  color="primary"
                  outline="none"
                  >
                  </TextButton>
                </Link>
                {theNFT.name}
              </h1>
            ) : (
              <h1>
                <Link href="/warning">
                  <TextButton
                  leadingIcon={MonochromeIcons.Exclaim}
                  color="primary"
                  outline="none"
                  >
                  </TextButton>
                </Link>
                {theNFT.name}
              </h1>
            )}
            <h3>
              <TextButton
              color='tertiary'>
              <img className="image-logo" src="/p2.svg" />
              {web3.utils.fromWei(theData.price)} MATIC
              </TextButton>
            </h3>
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
              <h3>by 
                <Link href={{pathname: '/u/[user]', query: { user: theNFT.creator }}}>   
                  <TextButton
                  color="primary"
                  >
                    {theNFT.creator.substring(0, 6)}..{theNFT.creator.substring(38)}
                  </TextButton>
                </Link>
              </h3> 
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
              border-radius: 30px;
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

            .image-logo {
              margin-left: 5px;
              margin-right: 5px;
              max-width: 25px;
            }

            .nft-img {
              max-width: 400px;
              max-height: 400px;
              cursor: pointer;
              border-radius: 15px;
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
