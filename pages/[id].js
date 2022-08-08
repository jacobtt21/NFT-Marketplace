import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { abiU } from '../contracts/abiU';
import Loading from '../components/Loading';
import { CallToAction, useToast, TextButton, MonochromeIcons, Linkable, HoverActivatedTooltip } from '@magiclabs/ui';
import Link from 'next/link'
import * as Panelbear from "@panelbear/panelbear-js";
import Head from 'next/head';
import Grid from '../components/Grid';


export default function Index() {
  const [disabled, setDisabled] = useState(false);
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [theNFT, setTheNFT] = useState();
  const [theData, setTheData] = useState();
  const [newRating, setNewRating] = useState('--');
  const [msg, setMsg] = useState(false);
  const [allNFTs, setAllNFTs] = useState([]);
  const [allPrices, setAllPrices] = useState();
  const [allNums, setAllNums] = useState();
  const [allStars, setAllStars] = useState();
  const [allStatus, setAllStatus] = useState();
  const [allVerify, setAllVerify] = useState();
  const [loading, setLoading] = useState(false);
  const [creatorz, setCreatorz] = useState('');
  const [userVerifyz, setUserVerifyz] = useState(false);
  const { createToast } = useToast();

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    if (!user) {
      return;
    }
    getMyNFT();
  }, [user, router.query.id]);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const contractUser = new web3.eth.Contract(abiU, userAddress);

  const getMyNFT = async () => {
    const nft = await contract.methods.getNFTbyId(parseInt(router.query.id)).call();
    const response = await fetch(nft[0]);
    const data = await response.json();
    setTheNFT(data);
    setTheData(nft);

    setLoading(true);

    const uriList = await contract.methods.getEverything().call();

    let prices = [];
    let onMarket = [];
    let nums = [];
    let stars = [];
    let nfts = [];
    let verified = [];

    var i = 0;
    var j = 0;
    for (i = uriList.length - 1; i >= 0; --i) {
      if (uriList[i][8]) {
        if (j < 4 && Math.random() < 0.5) {
          prices.push(uriList[i][2]);
          verified.push(uriList[i][7]);
          onMarket.push(uriList[i][6]);
          nums.push(uriList[i][5])
          stars.push(uriList[i][4]);
          const response = await fetch(uriList[i][0]);
          const data = await response.json();
          nfts.push(data);
          j += 1;
        }
      }
    }

    setAllNFTs(nfts);
    setAllPrices(prices);
    setAllStatus(onMarket);
    setAllNums(nums);
    setAllStars(stars);
    setAllVerify(verified);
    setLoading(false);

    setCreatorz(data.creator)

    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    console.log(userProfiles)
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (data.creator).toUpperCase()) {
        setCreatorz(userProfiles[i].username);
        setUserVerifyz(userProfiles[i].verify)
      }
    }
  };

  const addRating = async () => {
    Panelbear.track("RatingNFT");
    setDisabled(true);
    const errorsFound = await checkForErrors(1);
    if (errorsFound) {
      return setDisabled(false);
    }
    if (newRating === '--') {
      createToast({
        message: 'Please select a number',
        type: 'error',
        lifespan: 2000,
      });
      setNewRating('--');
      setMsg(false);
      return setDisabled(false);
    }
    try {
      setMsg(true)
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: theNFT.creator,
        value: 1000000000000000000,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: '0x4cB72Dca5C9299714bBf0D6D8F61d5B979a96940',
        value: 1000000000000000000,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      const receipt = await contract.methods
      .rateNFT(parseInt(router.query.id), parseInt(newRating))
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setNewRating('');
      setDisabled(false);
      router.reload(window.location.pathname);
    } 
    catch (error) {
      console.log(error);
      setMsg(false);
      setDisabled(false);
    }
  }

  const buy = async () => {
    Panelbear.track("BuyingNFT");
    setDisabled(true);
    const cost = theData.price;
    const errorsFound = await checkForErrors(2);
    if (errorsFound) {
      return setDisabled(false);
    }
    try {
      setDisabled(true);
      setMsg(true);

      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();

      if (theNFT.share !== "NaN") {
        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theNFT.share,
          value: cost * 0.05,
          gas: 1000000,
          maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
        });

        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theNFT.creator,
          value: cost * 0.1,
          gas: 1000000,
          maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
        });

        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theData.owner,
          value: cost - (cost * 0.15),
          gas: 1000000,
          maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
        });
      }
      else {
        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theNFT.creator,
          value: cost * 0.15,
          gas: 1000000,
          maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
        });

        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theData.owner,
          value: cost - (cost * 0.15),
          gas: 1000000,
          maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
        });
      }

      await contract.methods
      .transfer(user.publicAddress, parseInt(router.query.id), theData.owner)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      
      setDisabled(false);
      setMsg(false);
      router.reload(window.location.pathname);
    } 
    catch (error) {
      console.log(error);
      setMsg(false);
      setDisabled(false);
    }
  }

  const checkForErrors = async (val) => {
    // Throw error if missing input values// Throw error if user does not have enough ETH for gas fee
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const MaticBalance = web3.utils.fromWei(weiBalance);
    if (val === 1) {
      if (MaticBalance < 2.5) {
        createToast({
          message: 'MATIC Balance Too Low to Rate this Work',
          type: 'error',
          lifespan: 2000,
        });
        return true;
      }
    }
    else if (val === 2) {
      if (MaticBalance < parseFloat(web3.utils.fromWei(theData.price)) + 0.5) {
        createToast({
          message: 'MATIC Balance Too Low to Buy this Work',
          type: 'error',
          lifespan: 2000,
        });
        return true;
      }
    }
    // No errors found
    return false;
  };

  return user ? (
    <div>
      {theData && theNFT ? (
        <>
          <Head>
            <title>{theNFT.name} | Oustro</title>
          </Head>
          <div className='align'>
            <div className='img-holder'>
              <img
                src={theNFT.image}
                width={500}
                className="nft-img-large"
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
              {theNFT.socialLink !== "" && (
                <Linkable>
                  <a
                  href={theNFT.socialLink}
                  target="_blank">
                    <CallToAction
                    style={{
                      margin: 5
                    }}
                    >
                      Take me to the community &rarr;
                    </CallToAction>
                  </a>
                </Linkable>
              )}
            </div>
            <div>
              <div className='align'>
                <div>
                  <h1>
                    {theNFT.name}
                  </h1>
                </div>
                <div>
                  {(theData.owner).toUpperCase() !== (user.publicAddress).toUpperCase() ? (
                    <CallToAction
                    disabled={disabled ? true : !theData.onMarket ? ( true ) : (false)}
                    onClick={buy}
                    >
                      {!theData.onMarket ? ( "This NFT is not for sale" ) : ("Buy this work for " + (parseFloat(web3.utils.fromWei(theData.price)) + 0.5 ) +" MATIC")}
                    </CallToAction>
                  ) : (
                    <CallToAction
                    disabled
                    >
                      You own this work
                    </CallToAction>
                  )}
                </div>
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
                Created by
                <Link href={{pathname: '/u/[user]', query: { user: theNFT.creator }}}>
                  <TextButton
                  trailingIcon={userVerifyz && MonochromeIcons.SuccessFilled}
                  >
                   {creatorz}
                  </TextButton>
                </Link>
              </h2>
              {theNFT.creator !== user.publicAddress ? (
                <div className='ThumbUps'>
                  <h3>ThumbsUp&#8482; {theNFT.name}</h3>
                  <div
                  style={{
                    marginBottom: 30
                  }}>
                    <CallToAction
                    disabled={disabled}
                    color={
                      newRating === '1'
                      ? 'primary'
                      : 'secondary'
                    }
                    style={{
                      margin: 10
                    }}
                    onClick={() => setNewRating("1")}
                    >
                      1
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    color={
                      newRating === '2'
                      ? 'primary'
                      : 'secondary'
                    }
                    style={{
                      margin: 10
                    }}
                    onClick={() => setNewRating("2")}
                    >
                      2
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    color={
                      newRating === '3'
                      ? 'primary'
                      : 'secondary'
                    }
                    style={{
                      margin: 10
                    }}
                    onClick={() => setNewRating("3")}
                    >
                      3
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    color={
                      newRating === '4'
                      ? 'primary'
                      : 'secondary'
                    }
                    style={{
                      margin: 10
                    }}
                    onClick={() => setNewRating("4")}
                    >
                      4
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    color={
                      newRating === '5'
                      ? 'primary'
                      : 'secondary'
                    }
                    style={{
                      margin: 10
                    }}
                    onClick={() => setNewRating("5")}
                    >
                      5
                    </CallToAction>
                  </div>
                  <TextButton
                  disabled={disabled}
                  size="md"
                  onClick={addRating}
                  >
                    Submit your ThumbsUp&#8482; for 2.5 MATIC
                  </TextButton>
                </div>
              ) : (
                <>
                <div className='ThumbUps-hide'>
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
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    color="tertiary"
                    >
                      You cannot rate your own work
                    </CallToAction>
                  </div>
                </>
              )}
              {msg && (
                <div className='message'>
                  <CallToAction
                  size='lg'
                  outline
                  >
                    Please wait
                  </CallToAction>
                </div>
              )}
            </div>
          </div>
          <div className='more-header'>
            <h2>More works we thing you'd like</h2>
          </div>
          <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={true} takeAway={true} checkmark={allVerify} />
          <style>{`
            .align {
              padding: 20px;
              display: grid;
              grid-gap: 20px;
              grid-template-columns: 1fr 1fr;
              align-items: center;
            }
            .img-holder {
              text-align: center;
              border-right: 2px solid #f0f0f0;
            }
            .nft-img-large {
              border-radius: 30px;
            }
            .more-header {
              margin-top: 40px;
              text-align: center;
              font-size: 30px;
            }
            h1 {
              font-size: 60px;
              font-weight: bold;
              margin-bottom: 40px;
            }
            h2 {
              margin-bottom: 15px;
            }
            .ThumbUps {
              text-align: center;
            }
            .ThumbUps-hide {
              filter: blur(15px);
              text-align: center;
            }
            h3 {
              font-size: 25px;
              margin-top: 30px;
              margin-bottom: 30px;
              font-weight: bold;
            }
            .message {
              text-align: center;
              font-size: 25px;
              margin-top: 30px;
              margin-bottom: 30px;
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
  ) : (
    <Loading />
  );
}
