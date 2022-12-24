import { useState, useContext, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { abiC } from '../contracts/abiC';
import { TextField, CallToAction, useToast, HoverActivatedTooltip, Linkable, MonochromeIcons } from '@magiclabs/ui';
import Loading from '../components/Loading';
import algoliasearch from 'algoliasearch';
import { useRouter } from 'next/router';
import * as Panelbear from "@panelbear/panelbear-js";
import Head from 'next/head';
import { OpenAIApi, Configuration } from 'openai';
import Popup from 'reactjs-popup';

function Mint() {
  const [user] = useContext(UserContext);
  const [name, setName] = useState('');
  const [sharing, setShare] = useState('');
  const [social, setSocial] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [txHash, setTxHash] = useState();
  const [AI, setAI] = useState('');
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
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const commAddress = process.env.NEXT_PUBLIC_COMM_ADDRESS;
  const contractComm = new web3.eth.Contract(abiC, commAddress);

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
  });

  const openai = new OpenAIApi(configuration);

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
      const res = await fetch('https://ipfs-upload-58fg.onrender.com', {
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
      const res = await fetch('https://ipfs-upload-58fg.onrender.com', {
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

  const genImage = async () => {
    const response = await openai.createImage({
      prompt: AI,
      n: 1,
      size: "500x500",
    });
    image_url = response.data.data[0].url;
    setIpfsImageUrl(image_url)
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
      const formData = new FormData();
      formData.append("data", data);
      const res = await fetch('https://ipfs-data-upload.onrender.com', {
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
      .createNFT(url, web3.utils.toWei(costo), true, tIndex)
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

  const contentStyle = {
    background: "rgba(255,255,255, 1)",
    borderRadius: 15,
    padding: 20,
    width: 400,
    border: "none",
    textAlign: "center"
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
          <div className="mint-container">
            <div className='name'>
              <p>NFT Name</p>
              <TextField
              disabled={disabled}
              placeholder="Give your work a great name!"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              />
            </div>
            <div className='thumbnail'>
              <p>Upload Thumbnail (500 x 500)</p>
              <input 
              type="file"
              onChange={onImageUpload}
              ref={imageInputRef}
              disabled={disabled}
              accept="image/*" />
              <p className='dalle'>
                <Linkable>
                  <a 
                  onClick={() => setOpen(o => !o)}
                  disabled={disabled}
                  >
                    use AI to develop a thumbnail (Limited)
                  </a>
                </Linkable>
              </p>
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
                <div>
                  <h1 className='dalleH1'>AI Thumbnail Generation (Coming soon!)</h1>
                  <div className='AI'>
                    <p>A Detailed Description of Your Work</p>
                    <TextField
                    placeholder="An adventure of 2 space cowboys..."
                    type="text"
                    onChange={(e) => setAI(e.target.value)}
                    value={AI}
                    />
                  </div>
                  <div className='AISumbit'>
                    <CallToAction
                    disabled
                    onClick={genImage}
                    >
                      Generate Thumbnail
                    </CallToAction>
                  </div>
                </div>
              </Popup>
            </div>
            {ipfsImageUrl && (
              <div className='preview'>
                <img className="image-preview" src={ipfsImageUrl} />
              </div>
            )}
            <div className='work'>
              <p>Upload Work (.pdf, .html, .mp4)</p>
              <input 
              type="file"
              accept=".pdf, .html, .mp4"
              onChange={onWorkUpload} 
              ref={workInputRef}
              disabled={disabled} 
              />
            </div>
            {ipfsWorkUrl && (
              <div className='preview'>
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
            )}
            <div className='nname'>
              <p>Select Type</p>
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
            <div className='external'>
              <p>External Link (Optional)</p>
              <TextField
              disabled={disabled}
              placeholder="https://www.socialmedia.com/your/page"
              type="text"
              onChange={(e) => setSocial(e.target.value)}
              value={social}
              />
            </div>
            <div className='price'>
              <p>Price in Matic (Optional)</p>
              <TextField
              disabled={disabled}
              placeholder="Defaults to 0 if left empty"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              />
            </div>
            {price != '0' && price && (
              <div className='price'>
                <p>Wallet for Royalty Sharing (Optional)</p>
                <TextField
                disabled={disabled}
                placeholder="0x0.."
                type="text"
                onChange={(e) => setShare(e.target.value)}
                value={sharing}
                />
              </div>
            )}
            <div className='coc'>
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
            </div>
            <div className='submit'>
              <CallToAction
              color="primary"
              size="md"
              onClick={mintNFT}
              disabled={disabled}
              >
                Publish (3 MATIC)
              </CallToAction>
            </div>
            {mintStatus && (
              <div className='mintStatus'>
                <p>{mintStatus}</p>
              </div>
            )}
            {txHash && (
              <div className='mintStatus'>
                <p>Thank you for your contribution to the Oustro Library of Work!</p>
                <div className='copy'>
                  <CallToAction
                  color="primary"
                  size="sm"
                  outline="none"
                  onPress={copyLink}
                  leadingIcon={MonochromeIcons.Copy}
                  >
                    Share your work using this link
                  </CallToAction>
                </div>
              </div>
            )}
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
          line-height: 1.9;
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

        .closePop {
          margin-top: -40px;
          text-align: right;
          margin-right: -40px;
        }

        .image-preview {
          border-radius: 15px;
          width: 200px;
          height: 200px;
          margin: auto;
        }

        .preview {
          margin-top: 20px;
          text-align: center;
        }

        .mintStatus {
          margin-top: 20px;
          text-align: center;
        }

        input[type=file] {
          width: 350px;
          width: 98%;
          color: #444;
          padding: 5px;
          background: #fff;
          border-radius: 10px;
          border: 1px solid #E5E5E5;
        }
        
        input[type=file]::file-selector-button {
          margin-right: 20px;
          border: none;
          background: #6851FF;
          padding: 10px 20px;
          border-radius: 10px;
          color: #fff;
          cursor: pointer;
          width: 50%;
          transition: background .2s ease-in-out;
        }
        
        input[type=file]::file-selector-button:hover {
          background: #0d45a5;
        }

        .dalle {
          text-align: center;
          font-size: 13px;
        }

        .thumbnail {
          margin-top: 40px;
        }

        .AISumbit {
          margin-top: 40px;
        }

        .dalleH1 {
          text-align: center;
        }

        .external {
          margin-top: 20px;
        }

        .price {
          margin-top: 20px;
        }

        .coc {
          margin-top: 40px;
        }

        .submit {
          text-align: center;
          width: 100%;
          margin-top: 30px;
        }

        .work {
          margin-top: 20px;
          margin-bottom: 25px;
        }

        .copy {
          margin-top: 20px;
        }

        .AI {
          text-align: left;
        }
      `}</style>
    </div>
  );
}

export default Mint;
