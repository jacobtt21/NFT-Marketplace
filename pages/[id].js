import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { abiU } from '../contracts/abiU';
import Loading from '../components/Loading';
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
    console.log(theData)
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
    else if (val === 3) {
      if (MaticBalance < 0.5) {
        createToast({
          message: 'Wallet Balance Too Low to Change the Price (gas fees).',
          type: 'error',
          lifespan: 2000,
        });
        return true;
      }
    }
    else if (val === 4) {
      if (MaticBalance < 0.5) {
        createToast({
          message: 'Wallet Balance Too Low to Change Market Status (gas fees).',
          type: 'error',
          lifespan: 2000,
        });
        return true;
      }
    }
    // No errors found
    return false;
  };

  const changePrice = async () => {
    setDisabled(true);
    const errorsFound = await checkForErrors(3);
    if (errorsFound) {
      return setDisabled(false);
    }
    try {
      setMsg(true);
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contract.methods
      .changePrice(parseInt(theData.ID), web3.utils.toWei(newPrice), user.publicAddress)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setNewPrice('');
      setDisabled(false);
      setMsg(false);
      router.reload(window.location.pathname);
    } 
    catch (error) {
      console.log(error);
      setDisabled(false);
      setMsg(false);
    }
  }

  const changeStatus = async () => {
    setDisabled(true);
    const errorsFound = await checkForErrors(4);
    if (errorsFound) { 
      return setDisabled(false);
    }
    try {
      setMsg(true);
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contract.methods
      .changeMarketStatus(parseInt(theData.ID), user.publicAddress)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setDisabled(false);
      setMsg(false);
      router.reload(window.location.pathname);
    } 
    catch (error) {
      console.log(error);
      setDisabled(false);
      setMsg(false);
    }
  }

  const contentStyle = {
    background: "rgba(255,255,255, 1)",
    borderRadius: 15,
    padding: 20,
    width: 800,
    border: "none",
  };

  return user ? (
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
                {(theData.owner).toUpperCase() !== (user.publicAddress).toUpperCase() ? (
                  <CallToAction
                  size="lg"
                  disabled={disabled ? true : !theData.onMarket ? ( true ) : (false)}
                  onClick={buy}
                  >
                    {!theData.onMarket ? ( "Not For Sale" ) : ("Buy for " + (parseFloat(web3.utils.fromWei(theData.price)) + 0.5 ) +" MATIC")}
                  </CallToAction>
                ) : (
                  <>
                    <CallToAction
                    size='lg'
                    onClick={() => setOpen(o => !o)}
                    >
                      • • • •
                    </CallToAction>
                    <Popup
                    open={open}
                    contentStyle={contentStyle}
                    overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                    closeOnDocumentClick onClose={closeModal}
                    >
                      <div className='closePop'>
                        <CallToAction
                        onClick={closeModal}
                        >
                          X
                        </CallToAction>
                      </div>
                      <div className='alignsMed'>
                        <div>
                          <img
                            src={theNFT.image}
                            width={400}
                            className="nft-img-small"
                            onError={(e) => (e.target.src = '/fallback.jpeg')}
                          /> 
                        </div>
                        <div>
                          <h4 className='titleName'>{theNFT.name}</h4>
                          <h4 className='titleName'>Current Price: {(parseFloat(web3.utils.fromWei(theData.price)))} MATIC</h4>
                          <h4 className='titleName'>Market Status: {theData.onMarket ? "On Market" : "Not On Market"}</h4>
                          <h4 className='titleNameHeader'>New Price</h4>
                          <TextField
                          disabled={disabled}
                          type="number"
                          onChange={(e) => setNewPrice(e.target.value)}
                          value={newPrice}
                          >
                          </TextField>
                          <div className='submitPrice'>
                            <CallToAction
                            disabled={disabled}
                            color="primary"
                            onClick={changePrice}
                            >
                              Save New Price
                            </CallToAction>
                          </div>
                          {web3.utils.fromWei(theData.price) > 0 && (
                            <div className='submitStatus'>
                              <CallToAction
                              disabled={disabled}
                              color="primary"
                              onClick={changeStatus}
                              >
                                {theData.onMarket ? "Take Off Market" : "Put On Market"}
                              </CallToAction>
                            </div>
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
                    </Popup>
                  </>
                )}
              </div>
              </div>
              <div className='rating'>
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
                    <div className='hover'>
                      <CallToAction
                      color='tertiary'
                      >
                        You Can't Rate Your Own Work
                      </CallToAction>
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
                  </>
                )}
              </div>
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
  ) : (
    <Loading />
  );
}
