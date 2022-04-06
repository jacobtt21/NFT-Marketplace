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
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [txHash, setTxHash] = useState(false);
  const [ipfsImageUrl, setIpfsImageUrl] = useState('');
  const [ipfsWorkUrl, setIpfsWorkUrl] = useState('');
  const [price, setPrice] = useState();
  var imageInputRef = useRef(null);
  var workInputRef = useRef(null);
  const { createToast } = useToast();

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  const client = create('https://ipfs.infura.io:5001/api/v0');

  // Upload image to IPFS when uploaded by user
  async function onImageUpload(e) {
    const file = e;
    try {
      const ipfsData = await client.add(file);
      const urlImage = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
      setIpfsImageUrl(urlImage);
    } catch (error) {
      console.log(error);
    }
  }

  async function onWorkUpload(e) {
    const file = e;
    try {
      const ipfsData = await client.add(file);
      const urlWork = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
      setIpfsWorkUrl(urlWork);
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
      const data = JSON.stringify({ name, image: ipfsImageUrl, work: ipfsWorkUrl, creator: user.publicAddress });
      const ipfsData = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;

      setTxPending(true);

      const payment = await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: '0x4cB72Dca5C9299714bBf0D6D8F61d5B979a96940',
        value: 3000000000000000
      });

      const receipt = await contract.methods
        .createNFT(url, web3.utils.toWei(price))
        .send({ from: user.publicAddress });

      setTxHash(receipt.transactionHash);

      clearForm();
      console.log(receipt);
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };

  const checkForErrors = async () => {
    // Throw error if missing input values
    if (!name || !ipfsImageUrl || !ipfsWorkUrl || !price) {
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
    setName('');
    setIpfsImageUrl();
    setIpfsWorkUrl();
    setPrice('');
    imageInputRef.current = '';
    workInputRef.current = '';
  };

  const fileTypesImage = ["JPG", "PNG", "JPEG"];
  const fileTypesWork = ["PDF"];

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

            <br />
            <br />

            <p><b>Upload a thumbnail</b></p>
            <br />
            <FileUploader 
            disabled={disabled}
            handleChange={onImageUpload}
            ref={imageInputRef}
            name="image" 
            types={fileTypesImage} />

            <br />
            <p><b>Upload your Work</b></p>
            <br />
            <FileUploader
            disabled={disabled} 
            handleChange={onWorkUpload} 
            ref={workInputRef}
            name="file" 
            types={fileTypesWork} />

            <br />
            <TextField
            disabled={disabled}
            label="Sales Price (In ETH)"
            placeholder="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            />

            <br />
            <CallToAction
            color="primary"
            size="sm"
            onClick={mintNFT}
            disabled={disabled}
            >
            Mint
            </CallToAction>

            <div style={{ marginTop: '30px' }}>
              {txPending && 'Minting in Progress, this may take a little while!'}
              {txHash && (
                <>
                  <div>Yay! Transaction confirmed! Be sure to Note down what the ID of this NFT is!</div>
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
