import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Loading from '../components/Loading';
import { CallToAction, useToast, TextButton, MonochromeIcons, Linkable } from '@magiclabs/ui';
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
  const [msg1, setMsg1] = useState(false);
  const [allNFTs, setAllNFTs] = useState([]);
  const [allPrices, setAllPrices] = useState();
  const [allNums, setAllNums] = useState();
  const [allStars, setAllStars] = useState();
  const [allStatus, setAllStatus] = useState();
  const [allVerify, setAllVerify] = useState();
  const [loading, setLoading] = useState(false);
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
  const contract = new web3.eth.Contract(abi, contractAddress);

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
      setMsg1(true);

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
      setMsg1(false);
      router.reload(window.location.pathname);
    } 
    catch (error) {
      console.log(error);
      setMsg1(false);
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
            <div className="mint-container">
              <div className='align'>
                <div className='whwa'>
                  <img
                  src={theNFT.image}
                  className="nft-img2"
                  onError={(e) => (e.target.src = '/fallback.jpeg')}
                  style={{
                    marginBottom: 20
                  }}
                  /> 
                  <Linkable>
                    <a 
                    href={theNFT.work}
                    target="_blank">
                      <CallToAction
                      color="primary"
                      size='lg'
                      >
                        Take me to the work &rarr;
                      </CallToAction>
                    </a>
                  </Linkable>
                </div>
                <div>
                {theData.verify === '0' ? (
                  <h1>{theNFT.name}</h1>
                ) : theData.verify === '1' ? (
                  <h1>
                    <Link href="/verify">
                      <TextButton
                      leadingIcon={MonochromeIcons.SuccessFilled}
                      color="primary"
                      outline="none"
                      size='lg'
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
                <h3>created by</h3>
                <Link href={{pathname: '/u/[user]', query: { user: theNFT.creator }}}>
                  <TextButton
                  size='md'
                  >
                    {theNFT.creator.substring(0, 12)}...{theNFT.creator.substring(38)}
                  </TextButton>
                </Link>
                {(theData.owner).toUpperCase() !== (user.publicAddress).toUpperCase() ?
                  (theData.onMarket ? (
                    <div className="name23">
                      <CallToAction
                      disabled={disabled}
                      color="primary"
                      size="lg"
                      onClick={buy}
                      >
                        Buy this work for { (parseFloat(web3.utils.fromWei(theData.price)) + 0.5 )} MATIC
                      </CallToAction>
                      <br />
                      <br />
                      (Price + Gas)
                    </div>
                  ) : (
                    <>
                    </>
                  )
                ) : (
                  <div className="name23">
                  You own this work
                  </div>
                )}
                {msg1 && (
                  <>
                    <br />
                    Give us a moment to get this wrapping paper on right before you hand it off to you...
                  </>
                )}
                {theNFT.socialLink !== '' && (
                  <div className='name23'>
                    <Linkable>
                      <a 
                      target="_blank"
                      href={theNFT.socialLink}
                      >
                        <CallToAction
                        color="primary"
                        size='lg'
                        >
                          Take me to the community &rarr;
                        </CallToAction>
                      </a>
                    </Linkable>
                  </div>
                )}
                <br />           
                <div className='name23'>
                  <CallToAction
                  color="primary"
                  size="lg"
                  outline="none"
                  >
                    { theData.rating } / 5 Rating
                  </CallToAction>
                </div>
                {theNFT.creator !== user.publicAddress ? (
                  <div className="name23"> 
                    <h2>Add a rating for {theNFT.name}</h2>           
                    <CallToAction
                    disabled={disabled}
                    style={{
                      margin: 10
                    }}
                    color={
                      newRating === '1'
                      ? 'primary'
                      : 'secondary'
                    }
                    size='lg'
                    onClick={() => setNewRating("1")}
                    >
                      1
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    style={{
                      margin: 10
                    }}
                    color={
                      newRating === '2'
                      ? 'primary'
                      : 'secondary'
                    }
                    size='lg'
                    onClick={() => setNewRating("2")}
                    >
                      2
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    style={{
                      margin: 10
                    }}
                    size='lg'
                    color={
                      newRating === '3'
                      ? 'primary'
                      : 'secondary'
                    }
                    onClick={() => setNewRating("3")}
                    >
                      3
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    style={{
                      margin: 10
                    }}
                    color={
                      newRating === '4'
                      ? 'primary'
                      : 'secondary'
                    }
                    size='lg'
                    onClick={() => setNewRating("4")}
                    >
                      4
                    </CallToAction>
                    <CallToAction
                    disabled={disabled}
                    style={{
                      margin: 10
                    }}
                    color={
                      newRating === '5'
                      ? 'primary'
                      : 'secondary'
                    }
                    size='lg'
                    onClick={() => setNewRating("5")}
                    >
                      5
                    </CallToAction>
                    <br />
                    <br />
                    <TextButton
                    disabled={disabled}
                    size="lg"
                    onClick={addRating}
                    >
                      Submit a rating of&nbsp;
                      <CallToAction
                      disabled={disabled}
                      size="md"
                      onClick={addRating}
                      >
                       {newRating}
                      </CallToAction> 
                      &nbsp;for 2.5 MATIC
                    </TextButton>
                    {msg && (
                      <>
                        <br />
                        <br />
                        Give us a sec, we're explaining to the smart contract why you gave it this rating...it's very curious
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="name23">
                      As the Creator of this Work, you can't rate it!
                    </div>
                  </>
                )}        
                <div className='name23'>
                  <Link href={{pathname: '/contact/[id]', query: { id: router.query.id }}}>
                    <TextButton
                    color="error"
                    >
                    Report this Work
                    </TextButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='name2'>
            <h2>More works we thing you'd like</h2>
          </div>
          <Grid loading={loading} nfts={allNFTs} prices={allPrices} statuses={allStatus} type={true} stars={allStars} nums={allNums} go={true} takeAway={true} checkmark={allVerify} />
          <br />
          <style>{`
            h1 {
              font-weight: bold;
              font-size: 38px;
              margin: 20px;
              min-height: 28px;
            }

            .whwa {
              padding: 40px;
              border-radius: 30px;
              border: 1px solid #f9f9f9;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
            }

            .hsd {
              text-align: center
            }

            h2 {
              font-weight: bold;
              font-size: 25px;
              margin: 20px;
            }

            TextButton {
              font-size: 25px;
            }
                
            .align {
              padding: 20px;
              display: grid;
              grid-gap: 20px;
              grid-template-columns: 2fr 2fr;
              margin-bottom: 30px;
              margin-top: 0px;
              align-items: center;
            }
            .mint-container {
              text-align: center;
              margin: 0 auto;
              padding: 40px;
              border-radius: 30px;
            }
            h3 {
              margin-top: 20px;
              font-size: 20px;
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

            .nft-img2 {
              max-width: 600px;
              max-height: 600px;
              cursor: pointer;
              border-radius: 15px;
            }
                    
            .name23 {
              margin-top: 30px;
              text-align: center;
            }
            .name2 {
              margin-top: -30px;
              text-align: center;
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
