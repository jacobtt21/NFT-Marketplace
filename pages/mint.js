import { useState, useContext, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { create } from 'ipfs-http-client';
import { TextField, CallToAction, useToast } from '@magiclabs/ui';
import Loading from '../components/Loading';
import algoliasearch from 'algoliasearch';
import Link from 'next/link'
import * as Panelbear from "@panelbear/panelbear-js";
import Head from 'next/head';

function Mint() {
  const [user] = useContext(UserContext);
  const [name, setName] = useState('');
  const [sharing, setShare] = useState('');
  const [social, setSocial] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [txHash, setTxHash] = useState(false);
  const [show, setShow] = useState(true);
  const [ipfsImageUrl, setIpfsImageUrl] = useState('');
  const [mintStatus, setMintStatus] = useState('');
  const [ipfsWorkUrl, setIpfsWorkUrl] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('Choose from Below');
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
    } 
    catch (error) {
      console.log(error);
    }
  }

  async function onWorkUpload(e) {
    const file = e.target.files[0];
    try {
      const ipfsData = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
      setIpfsWorkUrl(url);
    } 
    catch (error) {
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

  const ChangeVis = async () => {
    setShow(!show);
  };

  // Mint NFT by sending tokenURI (IPFS URL) containing NFT metadata to smart contract
  const mintNFT = async () => {
    Panelbear.track("MintingNFT");
    setDisabled(true);

    const errorsFound = await checkForErrors();
    if (errorsFound) return setDisabled(false);

    try {
      var costo = '0';

      if (price) {
        costo = price;
      }
      
      setTxHash();

      setMintStatus("Uploading Work to IPFS")

      // Upload JSON data to IPFS (this is the NFT's tokenURI)
      var shareAddress;
      if (sharing === '') {
        shareAddress = "NaN";
      }
      else {
        if (sharing !== user.publicAddress) {
          shareAddress = sharing;
        }
        else {
          shareAddress = "NaN";
        }
      }
      const tIndex = await contract.methods.getIndex().call();
      const data = JSON.stringify({ name, image: ipfsImageUrl, work: ipfsWorkUrl, share: shareAddress, creator: user.publicAddress, socialLink: social, tokenID: tIndex, genre: genre });
      const ipfsData = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;

      setTokenz("https://oustro.xyz/s/"+tIndex);

      setTxPending(true);
      
      setMintStatus("Getting Fees")

      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();

      setMintStatus("Processing Fees")

      await web3.eth.sendTransaction({
        from: user.publicAddress,
        to: '0x4cB72Dca5C9299714bBf0D6D8F61d5B979a96940',
        value: 2000000000000000000,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });

      setMintStatus("Publishing In Progress")

      const receipt = await contract.methods
      .createNFT(url, web3.utils.toWei(costo), show)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });


      setTxHash(receipt.transactionHash);

      setMintStatus("Indexing")

      await index.saveObject({
        name: name,
        share: shareAddress,
        image: ipfsImageUrl,
        work: ipfsWorkUrl,
        creator: user.publicAddress,
        tokenID: tIndex

      }, {autoGenerateObjectIDIfNotExist: true})

      setMintStatus('')

      clearForm();
    } catch (error) {
      setDisabled(false);
      setMintStatus("An Error Occured, please try again later")
      console.log(error);
    }
  };

  const checkForErrors = async () => {
    // Throw error if missing input values
    if (!name || !ipfsImageUrl || !ipfsWorkUrl || genre === "Choose from Below") {
      createToast({
        message: 'Missing Required Fields',
        type: 'error',
        lifespan: 2000,
      });
      return true;
    }

    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const MaticBalance = web3.utils.fromWei(weiBalance);

    if (MaticBalance < 3) {
      createToast({
        message: 'Not enough Matic to Publish',
        type: 'error',
        lifespan: 2000,
      });
      return true;
    }

    return false;
  };

  const clearForm = async () => {
    setDisabled(false);
    setTxPending(false);
    setName('');
    setIpfsImageUrl();
    setIpfsWorkUrl();
    setPrice('');
    setSocial('');
    setShare('');
    imageInputRef.current.value = '';
    workInputRef.current.value = '';
  };

  return (
    <div>
      {!user ? (
        <Loading />
      ) : (
        <>
          <Head>
          <title>Publish | Oustro</title>
          <meta name="description" content="Publishing has never been easier and supporting creators has never been so rewarding. Welcome to Oustro." />
          <link
            rel="canonical"
            href="https://www.oustro.xyz/showcase"
            key="canonical"
          />
        </Head>
          <h1>If only everything was as easy as publishing on Oustro</h1>
          <h2>Make sure everything is correct, minting cannot be undone.</h2>
          <br />
          <div className="mint-container">
            <TextField
            disabled={disabled}
            label="Name of your Work"
            placeholder="Give your work a great name!"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required="required"
            />
            <br />
            <br />
            <TextField
            disabled={disabled}
            label="Social Links for this work (optional)"
            placeholder="Discord, Reddit, Telegram etc. (Only 1 Link)"
            type="text"
            onChange={(e) => setSocial(e.target.value)}
            value={social}
            />
            <br />
            {show ? (
              <>
                <div className='nname'>
                  <p>Visability: Public</p>
                </div>
                <CallToAction
                disabled={disabled}
                color="primary"
                size='sm'
                onClick={ChangeVis}
                >
                  Change to Private (Only Accessible by Link)
                </CallToAction>
              </>
            ) : (
              <>
                <div className='nname'>
                  <p>Visability: Private</p>
                </div>
                <CallToAction
                disabled={disabled}
                color="primary"
                size='sm'
                onClick={ChangeVis}
                >
                  Change to Public (Open to Everyone)
                </CallToAction>
              </>
            )}
            <br />
            <br />
            <div className='nname'>
              <p>Upload an image as a thumbnail for your work!</p>
            </div>
            <p>(500 x 500 Pixel works best)</p>
            <br />
            <input
            type="file"
            onChange={onImageUpload}
            ref={imageInputRef}
            disabled={disabled}
            accept="image/*"
            required="required"
            >
            </input>
            <br />
            {ipfsImageUrl && (
              <img className="image-preview" src={ipfsImageUrl} />
            )}
            <br />
            <br />
            <div className='nname'>
              <p>Upload your work!</p>
            </div>
            <p>(PDF file format)</p>
            <br />
            <input
            type="file"
            accept=".pdf, .html"
            onChange={onWorkUpload} 
            ref={workInputRef}
            disabled={disabled}
            required="required"
            >
            </input>
            <br />
            {ipfsWorkUrl && (
              <Link href={ipfsWorkUrl}>
                <a target="_blank">
                  <CallToAction
                  color="primary"
                  size='sm'
                  >
                    Check Your Work &rarr;
                  </CallToAction>
                </a>
              </Link>
            )}
            <div className='nname'>
              <p>Select Type (Required): {genre} </p>
            </div>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Story")}
            >
              Story
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Publication")}>
              Publication
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Poetry")}>
              Poetry
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Scripts")}>
              Script
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Academia")}>
              Academia
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Whitepaper")}>
              Whitepaper
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Game")}
            >
              Game
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Web")}
            >
              Web Page
            </CallToAction>
            <CallToAction
            disabled={disabled}
            onClick={() => setGenre("Other")}>
              Other
            </CallToAction>
            <br />
            <br />
            <TextField
            disabled={disabled}
            label="Sales Price in MATIC (optional)"
            placeholder="If empty, defaults to 0 MATIC"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            />
            <br />
            <br />
            {price != '0' && price ? (
              <TextField
              disabled={disabled}
              label="Wallet you would like to share royalties with (optional)"
              placeholder="0x0.."
              type="text"
              onChange={(e) => setShare(e.target.value)}
              value={sharing}
              />
            ) : (
              <></>
            )}
            <br />
            By Default Works are not put on the marketplace, this can be changed in
            'Your Collection' tab.
            <br />
            <br />
            <br />
            <br />
            <CallToAction
              color="primary"
              size="sm"
              onClick={mintNFT}
              disabled={disabled}
              >
                Publish (3 MATIC)
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
                  <br />
                  <br />
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

        h2 {
          font-size: 16px;
          margin: 20px;
          min-height: 28px;
        }
        p {
          min-height: 28px;
        }
        .info {
          magrin: 20px;
        }
      
        .mint-container {
          max-width: 400px;
          text-align: center;
          margin: 0 auto;
          padding: 40px;
          border-radius: 30px;
          border: 1px solid #f9f9f9;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }

        input[type=file], .image-preview {
          display: block;
          margin: 5px 5px;
        }

        .image-preview {
          border-radius: 8px;
          max-width: 200px;
          max-height: 200px;
          margin: auto;
        }

        .image-logo {
          margin-left: 5px;
          margin-right: 5px;
          max-width: 30px;
        }

        .nname {
          font-weight: bold;
          margin-top: 15px;
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
