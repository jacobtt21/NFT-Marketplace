import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Loading from '../components/Loading';
import { TextField, CallToAction, useToast, TextButton, MonochromeIcons } from '@magiclabs/ui';
import Link from 'next/link'
import * as Panelbear from "@panelbear/panelbear-js";
import Head from 'next/head';


export default function Index() {
  const [disabled, setDisabled] = useState(false);
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [theNFT, setTheNFT] = useState();
  const [theData, setTheData] = useState();
  const [newRating, setNewRating] = useState();
  const [msg, setMsg] = useState(false);
  const [msg1, setMsg1] = useState(false);
  const { createToast } = useToast();
  const [inti, setInti] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyNFT();
  }, [user]);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  const getMyNFT = async () => {
    const nft = await contract.methods.getNFTbyId(parseInt(router.query.id)).call();
    const response = await fetch(nft[0]);
    const data = await response.json();
    setTheNFT(data);
    setTheData(nft);
  };

  const addRating = async () => {
    Panelbear.track("RatingNFT");
    setDisabled(true);
    const errorsFound = await checkForErrors(1);
    if (errorsFound) {
      return setDisabled(false);
    }
    if (parseInt(newRating) > 5 || parseInt(newRating) < 0) {
      createToast({
        message: 'Rating must be between 0 - 5',
        type: 'error',
        lifespan: 2000,
      });
      setNewRating('');
      setMsg(false);
      return setDisabled(false);
    }
    try {
      setMsg(true)
      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: theNFT.Creator,
        value: 500000000000000
      });
      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: '0x4cB72Dca5C9299714bBf0D6D8F61d5B979a96940',
        value: 500000000000000
      });
      const receipt = await contract.methods.rateNFT(parseInt(router.query.id), parseInt(newRating)).send({ 
        from: user.publicAddress 
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
      if (theNFT.share !== "NaN") {
        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theNFT.share,
          value: cost * 0.05
        });
        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theNFT.Creator,
          value: cost * 0.1
        });
        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theData.owner,
          value: cost - (cost * 0.15)
        });
      }
      else {
        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theNFT.Creator,
          value: cost * 0.15
        });
        await web3.eth.sendTransaction({
          from: user.publicAddress,
          to: theData.owner,
          value: cost - (cost * 0.15)
        });
      }
      const receipt = await contract.methods.transfer(user.publicAddress, parseInt(router.query.id), theData.owner).send({ from: user.publicAddress });
      console.log(receipt)
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
    // Throw error if missing input values
    var reason = '';
    if (val === 1) {
      reason = "Rate this Work"
    }
    else if (val === 2) {
      reason = "Buy this NFT"
    }
    // Throw error if user does not have enough ETH for gas fee
    if (!(await hasEnoughFunds(val))) {
      createToast({
        message: 'ETH Balance Too Low to ' + reason,
        type: 'error',
        lifespan: 2000,
      });
      return true;
    }
    // No errors found
    return false;
  };

  const hasEnoughFunds = async (val) => {
    const cost = theData.price;
    const gasLimit = await calculateGasFee();
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const ethBalance = web3.utils.fromWei(weiBalance);
    const gasFeeInWei = (await web3.eth.getGasPrice()) * gasLimit;
    const gasFeeInEth = web3.utils.fromWei(gasFeeInWei.toString());
    const total = web3.utils.fromWei(cost);
    if (val === 1) {
      const neededFunds = gasFeeInEth  + 0.001;
      if (ethBalance > neededFunds) {
          return true;
      }
      return false;
    }
    else {
      const neededFunds = gasFeeInEth  + total;
      if (ethBalance > neededFunds) {
          return true;
      }
      return false;
    }
  };

  const getPrice = async () => {
    const gasLimit = await calculateGasFee();
    const gasFeeInWei = (await web3.eth.getGasPrice()) * gasLimit;
    const gasFeeInEth = web3.utils.fromWei(gasFeeInWei.toString());
    const neededFunds = gasFeeInEth;
    return neededFunds;
  };

  const calculateGasFee = async () => {
    // Pass in 74 character string (roughly same as IPFS URL) for accurate gas limit estimate
    return await contract.methods.createNFT('0'.repeat(74), '0'.repeat(74), true).estimateGas(
      {
        from: user.publicAddress,
      },
      (error, estimatedGasLimit) => {
        return estimatedGasLimit;
      }
    );
  };

  const mainFunction = async () => {
    const result = await getPrice()
    return result
  }

  if (user) {
    (async () => {
      setInti(await mainFunction())
    })()
  }

  return user ? (
    <div>
      {theData ? (
        <>
          <Head>
          <title>{theNFT.name} | Oustro</title>
          <meta name="description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
          <link
            rel="canonical"
            href="https://www.oustro.xyz/showcase"
            key="canonical"
          />
        </Head>
          <div className="mint-container">
            <Link href={theNFT.work}>
              <a target="_blank">
                <CallToAction
                color="primary"
                >
                  Take me to the work &rarr;
                </CallToAction>
              </a>
            </Link>
            {theData.verify === '0' ? (
              <h1>{theNFT.name}</h1>
            ) : (
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
            )}
            <h3>created by</h3>
            <Link href={{pathname: '/u/[user]', query: { user: theNFT.creator }}}>
              <TextButton>
                {theNFT.creator.substring(0, 12)}...{theNFT.creator.substring(38)}
              </TextButton>
            </Link>
            <br />            
            <br />
            <h3>Price: {web3.utils.fromWei(theData.price)} ETH</h3>
            <br />        
            <img
            src={theNFT.image}
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />    
            <div className='name'>
              <CallToAction
              color="primary"
              size="sm"
              outline="none"
              >
                { theData.rating } / 5 Rating
              </CallToAction>
            </div>
            { theNFT.socialLink !== '' && (
              <div className='name'>
                <Link href={theNFT.socialLink}>
                  <a target="_blank">
                    <CallToAction
                    color="primary"
                    >
                      Take me to the community &rarr;
                    </CallToAction>
                  </a>
                </Link>
              </div>
            )}
            {theNFT.creator !== user.publicAddress ? (
              <div className="name">            
                <TextField
                disabled={disabled}
                placeholder="Give this work a rating (on a scale to 0 - 5)"
                type="number"
                max="5"
                min="0"
                onChange={(e) => setNewRating(e.target.value)}
                value={newRating}
                />
                <br />
                {inti === 0 ? (
                  <TextButton
                  disabled={disabled}
                  color="primary"
                  size="sm"
                  onClick={addRating}
                  >
                    Submit Your Rating for -- ETH
                  </TextButton>
                ) : (
                  <TextButton
                  disabled={disabled}
                  color="primary"
                  size="sm"
                  onClick={addRating}
                  >
                    Submit Your Rating for {(inti.toString()).substring(0, 6)} ETH
                  </TextButton>
                )}
                <br />
                (0.0010 ETH + Gas)
                <br />
                <br />
                {msg && (
                  <>
                    <br />
                    <div className="name">
                      Give us a sec, we're explaining to the smart contract why you gave it this rating...it's very curious
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="name">
                  As the Creator of this Work, you can't rate it!
                </div>
              </>
            )}        
            {(theData.owner).toUpperCase() !== (user.publicAddress).toUpperCase() ?
              (theData.onMarket ? (
                <div className="name">
                  <CallToAction
                  disabled={disabled}
                  color="primary"
                  size="sm"
                  onClick={buy}
                  >
                    Buy this work for { ((parseFloat(web3.utils.fromWei(theData.price)) + parseFloat(inti)).toString()).substring(0, 6) } ETH
                  </CallToAction>
                </div>
              ) : (
                <div className="name">
                  This NFT is currently not for sale
                </div>
              )
            ) : (
              <div className="name">
                You own this NFT
              </div>
            )}
            {msg1 && (
              <>
                <br />
                Give us a moment to get this wrapping paper on right before you hand it off to you...
              </>
            )}
          </div>
          <div className='name'>
            <Link href={{pathname: '/contact/[id]', query: { id: router.query.id }}}>
              <TextButton
              color="error"
              >
                Report this Work
              </TextButton>
            </Link>
          </div>
          <br />

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
  ) : (
    <Loading />
  );
}
