import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import Loading from '../components/Loading';
import { TextField, CallToAction, useToast, TextButton } from '@magiclabs/ui';
import Link from 'next/link'

export default function Index() {
    const [disabled, setDisabled] = useState(false);
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [theNFT, setTheNFT] = useState();
  const [theData, setTheData] = useState();
  const [newRating, setNewRating] = useState();
  const [msg, setMsg] = useState(false);
  const { createToast } = useToast();

  useEffect(() => {
    if (!user) return;
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
    setMsg(true)
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
      setDisabled(true);
      const receipt = await contract.methods.rateNFT(parseInt(router.query.id), parseInt(newRating)).send({ from: user.publicAddress });
      console.log(receipt)
      setNewRating('');
      setDisabled(false);
      router.reload(window.location.pathname);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  }

  const buy = async () => {
    const cost = theData.price;
    const errorsFound = await checkForErrors();
    if (errorsFound) return setDisabled(false);
    try {
      setDisabled(true);
      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: theData.owner,
        value: cost
      });
      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: theNFT.Creator,
        value: cost * 0.005
      });
      const receipt = await contract.methods.transfer(user.publicAddress, parseInt(router.query.id), theData.owner).send({ from: user.publicAddress });
      console.log(receipt)
      setDisabled(false);
      router.reload(window.location.pathname);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  }

  const checkForErrors = async () => {
    // Throw error if missing input values
    
    // Throw error if user does not have enough ETH for gas fee
    if (!(await hasEnoughFunds())) {
      createToast({
        message: 'ETH Balance Too Low',
        type: 'error',
        lifespan: 2000,
      });
      return true;
    }

    // No errors found
    return false;
  };

  const hasEnoughFunds = async () => {
    const cost = theData.price;
    const gasLimit = await calculateGasFee();
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const ethBalance = web3.utils.fromWei(weiBalance);
    const gasFeeInWei = (await web3.eth.getGasPrice()) * gasLimit;
    const gasFeeInEth = web3.utils.fromWei(gasFeeInWei.toString());
    const total = web3.utils.fromWei(cost);
    const neededFunds = gasFeeInEth  + (1.05 * total);
    if (ethBalance - neededFunds > 0) {
        return true;
    }
    return false;
  };

  const calculateGasFee = async () => {
    // Pass in 74 character string (roughly same as IPFS URL) for accurate gas limit estimate
    return await contract.methods.transfer('0x0000000000000000000000000000000000000000', '0'.repeat(74), '0x0000000000000000000000000000000000000000').estimateGas(
      {
        from: user.publicAddress,
      },
      (error, estimatedGasLimit) => {
        return estimatedGasLimit;
      }
    );
  };

  return user ? (
    <div>
        {theData ? (
            <>
                <div className="mint-container">
                    <h1>{theNFT.name}</h1>
                    <h3>Price: {web3.utils.fromWei(theData.price)} rETH</h3>
                    <Link href={theNFT.work}>
                        <img
                            src={theNFT.image}
                            width={300}
                            className="nft-img"
                            onError={(e) => (e.target.src = '/fallback.jpeg')}
                        />
                    </Link>
                    <CallToAction
                    color="primary"
                    size="sm"
                    outline="none"
                    >
                        { theData.rating } / 5 Rating
                    </CallToAction>
                    {theNFT.Creator != user.publicAddress ? (
                        <div className="name">
                        <TextField
                            disabled={disabled}
                            placeholder="Rate (0 - 5)"
                            type="number"
                            max="5"
                            min="0"
                            onChange={(e) => setNewRating(e.target.value)}
                            value={newRating}
                        />
                        <br />
                        <CallToAction
                        disabled={disabled}
                        color="primary"
                        size="sm"
                        onClick={addRating}
                        >
                            Submit Rating
                        </CallToAction>
                        <br />
                        <br />
                        {msg && (
                          <>
                            Please wait, communicating with smart contract...
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
                    
                    {theData.owner != user.publicAddress ?
                     (theData.onMarket ? (
                        <div className="name">
                            <CallToAction
                            disabled={disabled}
                            color="primary"
                            size="sm"
                            onClick={buy}
                            >
                                Purchase NFT
                            </CallToAction>
                        </div>
                    ) : (
                      <div className="name">
                        This NFT is currently not for sale
                      </div>
                    )) : (
                      <div className="name">
                        You already own this NFT
                      </div>
                    )}
                
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
                    box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 16px;
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
                    .name {
                        margin-top: 40px;
                        text-align: center;
                      }
                `}</style>
            </>
        ) : (
            <>
                <Loading />
            </>
        )}
    </div>
  ) : (
    <Loading />
  );
}
