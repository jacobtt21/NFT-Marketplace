import { useState, useContext, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { create } from 'ipfs-http-client';
import { TextField, CallToAction, useToast, TextButton } from '@magiclabs/ui';
import Loading from '../components/Loading';

function Mint() {
  const [user] = useContext(UserContext);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [txHash, setTxHash] = useState(false);
  const [ipfsImageUrl, setIpfsImageUrl] = useState('');
  const imageInputRef = useRef();
  const { createToast } = useToast();

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  const client = create('https://ipfs.infura.io:5001/api/v0');

  // Upload image to IPFS when uploaded by user
  async function onImageUpload(e) {
    const file = e.target.files[0];
    try {
      const ipfsData = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
      setIpfsImageUrl(url);
    } catch (error) {
      console.log(error);
    }
  }

  // Mint NFT by sending tokenURI (IPFS URL) containing NFT metadata to smart contract
  const mintNFT = async () => {
    setDisabled(true);

    const errorsFound = await checkForErrors();
    if (errorsFound) return setDisabled(false);

    try {
      setTxHash();

      // Upload JSON data to IPFS (this is the NFT's tokenURI)
      const data = JSON.stringify({ name, image: ipfsImageUrl });
      const ipfsData = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;

      setTxPending(true);

      const receipt = await contract.methods
        .createNFT(url)
        .send({ from: user.publicAddress });

      console.log(receipt);
      setTxHash(receipt.transactionHash);
      clearForm();
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  const checkForErrors = async () => {
    // Throw error if missing input values
    if (!name || !ipfsImageUrl) {
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

    if (ethBalance > gasFeeInEth) return true;
    return false;
  };

  const calculateGasFee = async () => {
    // Pass in 74 character string (roughly same as IPFS URL) for accurate gas limit estimate
    return await contract.methods.createNFT('0'.repeat(74)).estimateGas(
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
    setName('');
    imageInputRef.current.value = '';
    setIpfsImageUrl();
  };

  return (
    <div>
      {!user ? (
        <Loading />
      ) : (
        <>
          <h1>Create Your Own NFT</h1>
          <div className="mint-container">
            <TextField
              disabled={disabled}
              label="NFT Name"
              placeholder="NFT Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="file"
              onChange={onImageUpload}
              ref={imageInputRef}
              disabled={disabled}
            />
            {ipfsImageUrl && (
              <img className="image-preview" src={ipfsImageUrl} />
            )}
            <CallToAction
              color="primary"
              size="sm"
              onClick={mintNFT}
              disabled={disabled}
            >
              Mint
            </CallToAction>
            <div style={{ marginTop: '30px' }}>
              {txPending && 'Waiting confirmation...'}
              {txHash && (
                <>
                  <div>Transaction confirmed!</div>
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
