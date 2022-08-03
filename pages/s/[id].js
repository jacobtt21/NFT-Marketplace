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
          <div className='align'>
            <div className='img-holder'>
              <img
                src={theNFT.image}
                className="nft-img"
                onError={(e) => (e.target.src = '/fallback.jpeg')}
                style={{
                  marginBottom: 30
                }}
              /> 
              <br />
              <Linkable>
                <a
                href={theNFT.work}
                target="_blank">
                  <CallToAction>
                    View {theNFT.name}
                  </CallToAction>
                </a>
              </Linkable>
            </div>
            <div>
              <div className='align'>
                <div>
                  {theData.verify === '1' ? (
                    <Link href="/verify">
                      <TextButton
                      leadingIcon={MonochromeIcons.SuccessFilled}
                      color="primary"
                      outline="none"
                      >
                        This is a verified work
                      </TextButton>
                    </Link>
                  ) : theData.verify === '2' ? (
                    <Link href="/mistake">
                      <TextButton
                      leadingIcon={MonochromeIcons.AsteriskBold}
                      color="primary"
                      outline="none"
                      >
                        This work has a mistake in it
                      </TextButton>
                    </Link>
                  ) : (
                    <Link href="/warning">
                      <TextButton
                      leadingIcon={MonochromeIcons.Exclaim}
                      color="primary"
                      outline="none"
                      >
                        This work might be offensive
                      </TextButton>
                    </Link>
                  )}
                  <h1>
                    {theNFT.name}
                  </h1>
                </div>
                <Link
                href="/login">
                  <CallToAction>
                    See More Works &rarr;
                  </CallToAction>
                </Link>
              </div>
              <div>
                <h2>
                  <CallToAction
                  outline>
                    {theData.rating} / 5
                  </CallToAction>
                  &nbsp;out of {theData.raters} ratings
                </h2>
              </div>
              <h2>
                Created by &nbsp;
                <Link href={{pathname: '/u/[user]', query: { user: theNFT.creator }}}>
                  <TextButton>
                   {theNFT.creator}
                  </TextButton>
                </Link>
              </h2>
              <div className='hidden-features'>
                <h3>Rate the Work</h3>
                <div
                style={{
                  marginBottom: 30
                }}>
                  <CallToAction
                  disabled
                  style={{
                    margin: 10
                  }}
                  >
                    1
                  </CallToAction>
                  <CallToAction
                  disabled
                  style={{
                    margin: 10
                  }}
                  >
                    2
                  </CallToAction>
                  <CallToAction
                  disabled
                  style={{
                    margin: 10
                  }}
                  >
                    3
                  </CallToAction>
                  <CallToAction
                  disabled
                  style={{
                    margin: 10
                  }}
                  >
                    4
                  </CallToAction>
                  <CallToAction
                  disabled
                  style={{
                    margin: 10
                  }}
                  >
                    5
                  </CallToAction>
                </div>
                <TextButton
                disabled
                >
                  If you're reading this, You shouldn't be
                </TextButton>
              </div>
              <div className='hover'>
                <Link href={{pathname: '/login', query: { id: router.query.id }}}>
                  <CallToAction
                  style={{
                    margin: 10
                  }}
                  color="tertiary"
                  >
                    ThumbsUp&#8482; {theNFT.name}
                  </CallToAction>
                </Link>
              </div>
            </div>
          </div>
          <style jsx>{`
            .img-holder {
              text-align: center;
              border-right: 2px solid #f0f0f0;
            }
            .nft-img {
              border-radius: 30px;
            }
            h1 {
              font-size: 60px;
              font-weight: bold;
              margin-bottom: 40px;
            }
            h2 {
              margin-bottom: 15px;
            }
            h3 {
              font-size: 40px;
              margin-top: 30px;
              margin-bottom: 30px;
            }
            .align {
              padding: 20px;
              display: grid;
              grid-gap: 20px;
              grid-template-columns: 1fr 1fr;
              align-items: center;
            }
            .centered-div {
              display: grid;
              grid-template-columns: 0.5fr 0.5fr;
              margin-top: 30px;
            }    
            .hidden-features {
              filter: blur(15px);
              text-align: center;
            }
            .hover {
              text-align: center;
              margin-top: -170px;
            }
          `}</style>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}
