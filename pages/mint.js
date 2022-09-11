import { useState, useContext, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { abiC } from '../contracts/abiC';
// import { create } from 'ipfs-http-client';
import { TextField, CallToAction, useToast, HoverActivatedTooltip, Linkable, MonochromeIcons } from '@magiclabs/ui';
import Loading from '../components/Loading';
import algoliasearch from 'algoliasearch';
import { useRouter } from 'next/router';
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
  const [genre, setGenre] = useState('Choose');
  const imageInputRef = useRef();
  const workInputRef = useRef();
  const { createToast } = useToast();
  const [tokenz, setTokenz] = useState('');
  const router = useRouter();

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const commAddress = process.env.NEXT_PUBLIC_COMM_ADDRESS;
  const contractComm = new web3.eth.Contract(abiC, commAddress);

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY,
  );
  
  const index = searchClient.initIndex('Oustro');

  // Upload image to IPFS when uploaded by user
  async function onImageUpload(e) {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch('https://ipfs-upload-oustro.herokuapp.com/', {
        method: "POST",
        body: formData
      })
      const url = await res.json();
      console.log(url)
      setIpfsImageUrl(url["url"])
    } 
    catch (error) {
      console.log(error);
    }
  }

  async function onWorkUpload(e) {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch('https://ipfs-upload-oustro.herokuapp.com/', {
        method: "POST",
        body: formData
      })
      const url = await res.json();
      console.log(url)
      setIpfsWorkUrl(url["url"])
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
      setMintStatus("Getting Fees")
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const tIndex2 = await contract.methods
      .getIndex()
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      const tIndex = parseInt(tIndex2.events.IDEvent.returnValues.id)
      var data;
      if (router.query.comm) {
        setMintStatus("Connecting with Community")
        data = JSON.stringify({ name, image: ipfsImageUrl, work: ipfsWorkUrl, share: shareAddress, creator: user.publicAddress, socialLink: social, tokenID: tIndex, genre: genre, comm: router.query.comm });
        const receipt1 = await contractComm.methods
        .addContributor(router.query.comm)
        .send({ 
          from: user.publicAddress,
          gas: 1000000,
          maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
        });
      }
      else {
        data = JSON.stringify({ name, image: ipfsImageUrl, work: ipfsWorkUrl, share: shareAddress, creator: user.publicAddress, socialLink: social, tokenID: tIndex, genre: genre });
      }
      // const ipfsData = await client.add(data);
      // const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
      const formData = new FormData();
      formData.append("data", data);
      const res = await fetch('https://ipfs-data-upload-oustro.herokuapp.com/', {
        method: "POST",
        body: formData
      })
      const urlRes = await res.json();
      console.log(urlRes)
      const url = urlRes["url"]

      setTokenz("https://oustro.xyz/s/"+tIndex);

      setTxPending(true);
      
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
      .createNFT(url, web3.utils.toWei(costo), show, tIndex)
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
    if (!name || !ipfsImageUrl || !ipfsWorkUrl || genre === "Choose") {
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
          <link
            rel="canonical"
            href="https://www.oustro.xyz/showcase"
            key="canonical"
          />
        </Head>
          <h1>If only everything were as easy as publishing an NFT on Oustro</h1>
          <h2>Make sure everything is correct. Revisions cannot be done.</h2>
          <br />
          <div className="mint-container">
            <TextField
            disabled={disabled}
            label="Name"
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
            {show ? (
              <>
                <div className='nname'>
                  <div className='ones'>
                    <br />
                    <p>Visability: Public</p>
                    <br />
                    <CallToAction
                    disabled={disabled}
                    color="primary"
                    size='sm'
                    onClick={ChangeVis}
                    >
                      Change to Private (Only Accessible by Link)
                    </CallToAction>
                    <br />
                    <br />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='nname'>
                  <br />
                  <div className='ones'>
                    <p>Visability: Private</p>
                    <br />
                    <CallToAction
                    disabled={disabled}
                    color="primary"
                    size='sm'
                    onClick={ChangeVis}
                    >
                      Change to Public (Open to Everyone)
                    </CallToAction>
                    <br />
                    <br />
                  </div>
                </div>
              </>
            )}
            <div className='nname'>
              <p>Upload an image as a thumbnail for your work! (500 x 500 Pixel works best)</p>
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
              {ipfsImageUrl && (
                <>
                  <br />
                  <img className="image-preview" src={ipfsImageUrl} />
                </>
              )}
              <br />
            </div>
            <div className='nname'>
              <p>Upload your work! (PDF, HTML, MP4)</p>
              <br />
              <input
              type="file"
              accept=".pdf, .html, .mp4"
              onChange={onWorkUpload} 
              ref={workInputRef}
              disabled={disabled}
              required="required"
              >
              </input>
              {ipfsWorkUrl && (
                <>
                  <br />
                  <div className='ones'>
                    <Linkable>
                    <a 
                    href={ipfsWorkUrl}
                    target="_blank"
                    >
                      <CallToAction
                        color="primary"
                        size='sm'
                        >
                          Check Your Work &rarr;
                        </CallToAction>
                      </a>
                    </Linkable>
                  </div>
                </>
              )}
              <br />
            </div>
            <div className='nname'>
              <p>Select Type (Required): </p>
              <br />
              <HoverActivatedTooltip
                arrow
                placement="right"
              >
                <HoverActivatedTooltip.Anchor>
                  <CallToAction
                  disabled={disabled}
                  trailingIcon={MonochromeIcons.CaretRight}
                  size='sm'
                  style={{
                    marginRight: 'auto'
                  }}
                  >
                    {genre} 
                  </CallToAction>
                </HoverActivatedTooltip.Anchor>
                <HoverActivatedTooltip.Content>
                  <div>
                    <CallToAction
                    disabled={disabled}
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    onClick={() => setGenre("Story")}
                    >
                      Story
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Publication")}>
                      Publication
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Poetry")}>
                      Poetry
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Scripts")}>
                      Script
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Academia")}>
                      Academia
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Whitepaper")}>
                      Whitepaper
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Game")}
                    >
                      Game
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Web")}
                    >
                      Web Page
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Short Film")}>
                      Short Film
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Feature Film")}>
                      Feature Film
                    </CallToAction>
                    <CallToAction
                    style={{
                      margin: 10
                    }}
                    size='sm'
                    disabled={disabled}
                    onClick={() => setGenre("Other")}>
                      Other
                    </CallToAction>
                  </div>
                </HoverActivatedTooltip.Content>
              </HoverActivatedTooltip>
            </div>
            <div className='nname2'>
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
              {price != '0' && price && (
                <>
                  <TextField
                  disabled={disabled}
                  label="Wallet you would like to share royalties with (optional)"
                  placeholder="0x0.."
                  type="text"
                  onChange={(e) => setShare(e.target.value)}
                  value={sharing}
                  />
                  <br />
                </>
              )}
            </div>
            <div className='checkbox'>
              By publishing, you certify that you have read and understood the&nbsp; 
                <Linkable>
                  <a 
                  href="/code"
                  target="_blank"
                  >
                    code of conduct
                  </a>
                </Linkable>
                &nbsp;for works published on Oustro. 
                <br />
                <br />
                Once published, works cannot be changed.
            </div>
            <div className='yeet'>
              <CallToAction
              color="primary"
              size="sm"
              onClick={mintNFT}
              disabled={disabled}
              >
                Publish (3 MATIC)
              </CallToAction>
              <div style={{ marginTop: '30px' }}>
                {mintStatus && (
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
                    leadingIcon={MonochromeIcons.Copy}
                    >
                      Share your work using this link
                    </CallToAction>
                  </>
                )}
              </div>
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
          line-height: 1.6;
        }
        .info {
          magrin: 20px;
        }

        .checkbox {
          text-align: center;
          margin-bottom: 25px;
          margin-top: 35px;
        }
      
        .mint-container {
          max-width: 489px;
          text-align: left;
          margin: 0 auto;
          padding: 40px;
          border-radius: 30px;
          border: 1px solid #f9f9f9;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }

        .yeet {
          text-align: center;
        }

        input[type=file], .image-preview {
          display: block;
          margin: 5px 5px;
        }

        .image-preview {
          border-radius: 15px;
          max-width: 200px;
          max-height: 200px;
          margin: auto;
        }

        .ones {
          text-align: center;
        }

        .image-logo {
          margin-left: 5px;
          margin-right: 5px;
          max-width: 30px;
        }

        .nname {
          border-bottom: 1px solid #f0f0f0;
          padding: 15px;
        }
        .name {
          margin-top: 10px;
          text-align: center;
        }
        .name3 {
          margin-top: 40px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Mint;
