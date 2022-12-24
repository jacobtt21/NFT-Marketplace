import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../../lib/UserContext';
import { web3 } from '../../lib/magic';
import { abi } from '../../contracts/abi';
import { abiU } from '../../contracts/abiU';
import Loading from '../../components/Loading';
import { CallToAction, useToast, TextButton, MonochromeIcons, Linkable, TextField } from '@magiclabs/ui';
import Link from 'next/link'
import * as Panelbear from "@panelbear/panelbear-js";
import Head from 'next/head';
import Popup from 'reactjs-popup';


export default function Index() {
  const [disabled, setDisabled] = useState(false);
  const [newPrice, setNewPrice] = useState();
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [theNFT, setTheNFT] = useState();
  const [theData, setTheData] = useState();
  const [newRating, setNewRating] = useState('--');
  const [msg, setMsg] = useState(false);
  const [creatorz, setCreatorz] = useState('');
  const [userVerifyz, setUserVerifyz] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const { createToast } = useToast();

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    if (user) {
      router.push('/'+router.query.id);
    }
    getMyNFT();
  }, [user, router.query.id]);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const contractUser = new web3.eth.Contract(abiU, userAddress);

  const getMyNFT = async () => {
    const nft = await contract.methods.getNFTbyId(router.query.id).call();
    const response = await fetch(nft[0]);
    const data = await response.json();
    setTheNFT(data);
    setTheData(nft);

    setCreatorz(data.creator)

    console.log(theData)

    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (data.creator).toUpperCase()) {
        setCreatorz(userProfiles[i].username);
        setUserVerifyz(userProfiles[i].verify)
      }
    }
  };


  return (
    <div>
      {theData && theNFT ? (
        <>
          <Head>
            <title>{theNFT.name} | Oustro</title>
          </Head>
          <div className='aligns'>
            <div className='img-container'>
              <img
                src={theNFT.image}
                width={500}
                className="nft-img-large"
                onError={(e) => (e.target.src = '/fallback.jpeg')}
              /> 
              <div className='view'>
              {theNFT.socialLink !== "" && (
                <a
                href={theNFT.socialLink}
                target="_blank"
                >
                  <CallToAction
                  leadingIcon={MonochromeIcons.Astronaut}
                  >
                    Social Link
                  </CallToAction>
                </a>
              )}
              </div>
            </div>
            <div className='info-container'>
              <div className='info'>
                <h1>
                  <Linkable>
                    <a
                    href={theNFT.work}
                    target="_blank">
                      {theNFT.name} &rarr;
                    </a>
                  </Linkable>
                </h1>
              </div>
              <div className='alignsSmall'>
                <div className='words'>
                  <h2>
                    <CallToAction
                    outline
                    >
                      {theData.rating} / 5
                    </CallToAction>
                    &nbsp;out of {theData.raters} ratings
                  </h2>
                  <h2 className='creator'>
                    Created by
                    <Link href={{pathname: '/u/[user]', query: { user: theNFT.creator }}}>
                      <TextButton
                      trailingIcon={userVerifyz && MonochromeIcons.SuccessFilled}
                      >
                      {creatorz}
                      </TextButton>
                    </Link>
                  </h2>
                </div>
                <div className='actionButton'>
                  <Link href={{pathname: '/login', query: { id: router.query.id }}}>
                    <CallToAction>
                      See More NFTs on Oustro
                    </CallToAction>
                  </Link>
                </div>
              </div>
              <div className='rating'>
                <div className='hover'>
                  <Link href={{pathname: '/login', query: { id: router.query.id }}}>
                    <CallToAction
                    color='tertiary'
                    >
                      ThumbsUp {theNFT.name}
                    </CallToAction>
                  </Link>
                </div>
                <div className='ThumbUps-hide'>
                  <h3>ThumbsUp&#8482; {theNFT.name}</h3>
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
              </div>
            </div>
          </div>
          <style>{`
            .img-container {
              border-right: 2px solid #f0f0f0;
              text-align: center;
            }

            .creator {
              margin-top: 20px;
            }

            .closePop {
              margin-top: -40px;
              text-align: right;
              margin-right: -40px;
            }

            .titleName {
              margin-bottom: 10px;
              font-size: 20px;
            }

            .titleNameHeader {
              margin-bottom: 10px;
              margin-top: 30px;
              font-size: 15px;
            }

            .submitPrice {
              text-align: center;
              margin-bottom: 10px;
              margin-top: 20px;
            }

            .submitStatus {
              text-align: center;
              margin-top: 40px;
            }

            .ThumbUps {
              text-align: center;
              background: #f0f0f0;
              padding: 30px;
              border-radius: 20px;
              width: 70%;
              margin: -50px auto;
            }

            .ThumbUps-hide {
              filter: blur(15px);
              text-align: center;
            }

            .view {
              text-align: center;
            }

            .rating {
              margin-top: 80px;
            }

            .hover {
              text-align: center;
              margin-bottom: -50px;
            }

            .actionButton {
              text-align: center;
            }

            .aligns {
              padding: 20px;
              display: grid;
              grid-gap: 20px;
              grid-template-columns: 0.75fr 1fr;
              align-items: center;
            }

            .alignsSmall {
              padding: 20px;
              display: grid;
              grid-gap: 20px;
              grid-template-columns: 1fr 1fr;
              align-items: center;
              text-algin: center;
            }

            .alignsMed {
              padding: 20px;
              display: grid;
              grid-gap: 20px;
              grid-template-columns: 1fr 1fr;
              align-items: center;
              text-algin: center;
            }

            .message {
              text-align: center;
              margin-top: 20px;
            }

            h1 {
              font-weight: bold;
              font-size: 28px;
              margin: 20px;
              min-height: 28px;
            }

            h3 {
              text-align: center;
              font-size: 25px;
              margin-bottom: 20px;
            }

            .nft-img-large {
              border-radius: 30px;
              width: 500px;
              margin-bottom: 20px;
              height: 500px;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              text-align: center;
            }

            .nft-img-small {
              border-radius: 30px;
              width: 400px;
              height: 400px;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
