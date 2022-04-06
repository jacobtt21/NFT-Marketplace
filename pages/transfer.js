import { useState, useContext, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { create } from 'ipfs-http-client';
import { TextField, CallToAction, useToast, TextButton } from '@magiclabs/ui';
import Loading from '../components/Loading';
import { FileUploader } from "react-drag-drop-files";

function Mint() {
  const [user] = useContext(UserContext);
  const [token, setToken] = useState();
  const [other, setOther] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [txHash, setTxHash] = useState(false);
  const { createToast } = useToast();

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  // Mint NFT by sending tokenURI (IPFS URL) containing NFT metadata to smart contract
  const TransferNFT = async () => {
    setDisabled(true);

    const errorsFound = await checkForErrors();
    if (errorsFound) return setDisabled(false);

    try {
      setTxHash();      

      setTxPending(true);

      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: '0x4cB72Dca5C9299714bBf0D6D8F61d5B979a96940',
        value: 3000000000000000
      });

      const receipt = await contract.methods
        .createNFT(url, web3.utils.toWei(price))
        .send({ from: user.publicAddress });

      setTxHash(receipt.transactionHash);

      clearForm();
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  const checkForErrors = async () => {
    // Throw error if missing input values
    if (!other || !token) {
      createToast({
        message: 'Missing Required Fields',
        type: 'error',
        lifespan: 2000,
      });
      return true;
    }

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
    const gasLimit = await calculateGasFee();
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const ethBalance = web3.utils.fromWei(weiBalance);
    const gasFeeInWei = (await web3.eth.getGasPrice()) * gasLimit;
    const gasFeeInEth = web3.utils.fromWei(gasFeeInWei.toString());
    const neededFunds = gasFeeInEth * 1.05;
    if (ethBalance > neededFunds) return true;
    return false;
  };

  const calculateGasFee = async () => {
    // Pass in 74 character string (roughly same as IPFS URL) for accurate gas limit estimate
    return await contract.methods.createNFT('0'.repeat(74), '0'.repeat(74)).estimateGas(
      {
        from: user.publicAddress,
      },
      (error, estimatedGasLimit) => {
        return estimatedGasLimit;
      }
    );
  };

  const clearForm = async () => {
    setDisabled(false);
    setTxPending(false);
    setOther('');
    setToken();
  };

  return (
    <div>
      {!user ? (
        <Loading />
      ) : (
        <>
          <h1>Transfer an NFT</h1>
          <div className="mint-container">
            <TextField
              disabled={disabled}
              label="NFT ID"
              placeholder="NFT ID"
              type="number"
              onChange={(e) => setToken(e.target.value)}
              value={token}
            />

            <br />

            <TextField
              disabled={disabled}
              label="Send to Address"
              placeholder="0x0..."
              type="text"
              onChange={(e) => setOther(e.target.value)}
              value={other}
            />

            <br />
            <br />

            <br />
            <CallToAction
            color="primary"
            size="sm"
            onClick={TransferNFT}
            disabled={disabled}
            >
            Transfer
            </CallToAction>

            <div style={{ marginTop: '30px' }}>
              {txPending && 'Minting in Progress, this may take a little while!'}
              {txHash && (
                <>
                  <div>Yay! Transaction confirmed!</div>
                  <a
                    href={`https://ropsten.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <TextButton color="primary" size="sm">
                      View on Etherscan
                    </TextButton>
                  </a>
                </>
              )}
            </div>
          </div>
        </>
      )}
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
      `}</style>
    </div>
  );
}

export default Mint;
