import { useState, useContext, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { create } from 'ipfs-http-client';
import { TextField, CallToAction, useToast, TextButton } from '@magiclabs/ui';
import Loading from '../components/Loading';
import algoliasearch from 'algoliasearch';

function Mint() {
  const [user] = useContext(UserContext);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [txHash, setTxHash] = useState(false);
  const [ipfsImageUrl, setIpfsImageUrl] = useState('');
  const [mintStatus, setMintStatus] = useState('');
  const [ipfsWorkUrl, setIpfsWorkUrl] = useState('');
  const [price, setPrice] = useState();
  const imageInputRef = useRef();
  const workInputRef = useRef();
  const { createToast } = useToast();
  const [tokenz, setTokenz] = useState('');

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  const client = create('https://ipfs.infura.io:5001/api/v0');

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY,
  );
  const index = searchClient.initIndex('Oustro');

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

  async function onWorkUpload(e) {
    const file = e.target.files[0];
    try {
      const ipfsData = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
      setIpfsWorkUrl(url);
    } catch (error) {
      console.log(error);
    }
  }

  const copyLink = async () => {
    navigator.clipboard.writeText(tokenz);
    createToast({
      message: 'Link Copied!',
      type: 'success',
      lifespan: 2000,
    });
  };

  // Mint NFT by sending tokenURI (IPFS URL) containing NFT metadata to smart contract
  const mintNFT = async () => {
    setDisabled(true);

    const errorsFound = await checkForErrors();
    if (errorsFound) return setDisabled(false);

    try {
      setTxHash();

      setMintStatus("Uploading Work to IPFS")

      // Upload JSON data to IPFS (this is the NFT's tokenURI)
      const tIndex = await contract.methods.getIndex().call();
      const data = JSON.stringify({ name, image: ipfsImageUrl, work: ipfsWorkUrl, creator: user.publicAddress, tokenID: tIndex });
      const ipfsData = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;

      setTokenz("https://oustro.co/s/"+tIndex);

      setTxPending(true);

      setMintStatus("Processing Minting Fees")

      const payment = await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: '0x4cB72Dca5C9299714bBf0D6D8F61d5B979a96940',
        value: 3000000000000000
      });

      setMintStatus("Minting In Progress")

      const receipt = await contract.methods
        .createNFT(url, web3.utils.toWei(price))
        .send({ from: user.publicAddress });


      setTxHash(receipt.transactionHash);

      setMintStatus("Indexing")

      const search = await index.saveObject({
        name: name,
        image: ipfsImageUrl,
        work: ipfsWorkUrl,
        creator: user.publicAddress,
        tokenID: tIndex

      },
      {autoGenerateObjectIDIfNotExist: true})

      setMintStatus('')

      clearForm();
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
    imageInputRef.current.value = '';
    workInputRef.current.value = '';
  };

  return (
    <div>
      {!user ? (
        <Loading />
      ) : (
        <>
          <h1>Publishing has never been easier.</h1>
          <br />
          <div className="mint-container">
            <TextField
              disabled={disabled}
              label="NFT Name"
              placeholder="Give your work a great name!"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required="required"
            />

            <br />
            <br />

            <p>Upload an image as a thumbnail for your work!</p>
            <br />
            <input
              type="file"
              onChange={onImageUpload}
              ref={imageInputRef}
              disabled={disabled}
              accept="image/*"
              required="required"
            ></input>

            <br />
            <p><b>Upload a PDF of your work!</b></p>
            <br />
            <input
              type="file"
              accept=".pdf"
              onChange={onWorkUpload} 
              ref={workInputRef}
              disabled={disabled}
              required="required"
            ></input>
            <br />
            <TextField
            disabled={disabled}
            label="Sales Price in ETH"
            placeholder="Price of this NFT"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required="required"
            />

            <br />
            <CallToAction
            color="primary"
            size="sm"
            onClick={mintNFT}
            disabled={disabled}
            >
            Mint this NFT
            </CallToAction>

            <div style={{ marginTop: '30px' }}>
              {txPending && (
                <>
                <div>{mintStatus}</div>
              </>
                )}
              {txHash && (
                <>
                <div className='name'>
                  Thank you for your contribution to the Oustro Library of Work!
                </div>
                  <CallToAction
                      color="primary"
                      size="sm"
                      outline="none"
                      onPress={copyLink}
                    >
                      Share your NFT using this link
                    </CallToAction>
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
        p {
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
        .name {
          margin-top: 10px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Mint;
