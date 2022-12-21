import { useState, useContext, useRef } from 'react';
import { UserContext } from '../../lib/UserContext';
import { web3 } from '../../lib/magic';
import { abiC } from '../../contracts/abiC';
import { create } from 'ipfs-http-client';
import { TextField, CallToAction, useToast, MonochromeIcons, Linkable } from '@magiclabs/ui';
import Loading from '../../components/Loading';
import algoliasearch from 'algoliasearch';
import Head from 'next/head';

function Mint() {
  const [user] = useContext(UserContext);
  const imageInputRef = useRef();
  const { createToast } = useToast();
  const [comName, setComName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [disabled, setDisabled] = useState('');
  const [ipfsImageUrl, setIpfsImageUrl] = useState('');
  const [tokenz, setTokenz] = useState('');

  const commAddress = process.env.NEXT_PUBLIC_COMM_ADDRESS;
  const contractComm = new web3.eth.Contract(abiC, commAddress);

  const client = create('https://ipfs.infura.io:5001');

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY,
  );
  
  const index = searchClient.initIndex('OustroComms');

  // Upload image to IPFS when uploaded by user
  async function onImageUpload(e) {
    const file = e.target.files[0];
    try {
      // const ipfsData = await client.add(file);
      // const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
      // setIpfsImageUrl(url);
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

  const copyLink = async () => {
    navigator.clipboard.writeText(tokenz);
    createToast({
      message: 'Link Copied!',
      type: 'success',
      lifespan: 2000,
    });
  };

  // Mint NFT by sending tokenURI (IPFS URL) containing NFT metadata to smart contract
  const createComm = async () => {
    setDisabled(true)
    if (!comName || !ipfsImageUrl || !newBio) {
      createToast({
        message: 'Missing Required Fields',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled(false)
      return true;
    }

    if ('CREATE' === comName.toUpperCase() || 'ALL' === comName.toUpperCase()) {
      createToast({
        message: 'Invalid Community Name',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled(false)
      return true;
    }

    if (!/^[0-9a-zA-Z]+$/.test(comName)) {
      createToast({
        message: 'Invalid Community Name',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled(false)
      return true;
    }

    const uriList = await contractComm.methods.getAllCommunities().call();
    for (var i = 0; i < uriList.length; ++i) {
      if ((uriList[i].cname).toUpperCase() === comName.toUpperCase()) {
        createToast({
          message: 'Community Already Exists',
          type: 'error',
          lifespan: 2000,
        });
        setDisabled(false)
        return true;
      }
    }
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const MaticBalance = web3.utils.fromWei(weiBalance);
    if (MaticBalance < 0.5) {
      createToast({
        message: 'Wallet Balance Too Low to change your profile picture (need at least 0.5 Matic)',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled(false)
      return;
    }
    try {
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contractComm.methods
      .createCommunity(user.publicAddress, comName, ipfsImageUrl, newBio)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      await index.saveObject({
        name: comName,
        image: ipfsImageUrl,
        creator: user.publicAddress,
      }, {autoGenerateObjectIDIfNotExist: true})
      setDisabled(false);
      setTokenz("https://wwww.oustro.xyz/community/"+comName)
      clearForm();
    }
    catch (error) {
      console.log(error);
      setDisabled(false)
    }
    setDisabled(false)
  };

  const clearForm = async () => {
    imageInputRef.current.value = '';
    setIpfsImageUrl('')
    setComName('')
    setNewBio('')
  };

  return (
    <div>
      {!user ? (
        <Loading />
      ) : (
        <>
        <Head>
          <title>Create a Community | Oustro</title>
          <link
            rel="canonical"
            href="https://www.oustro.xyz/showcase"
            key="canonical"
          />
        </Head>
          <h1>Creators are Visionaries. Creators are Dreamers. Creators are Communities.</h1>
          <h2>Make sure everything is correct. Revisions cannot be done.</h2>
          <br />
          <div className="mint-container">
            <TextField
            disabled={disabled}
            label="Name"
            placeholder="Give your community a name. Only A-z, 0-9"
            type="text"
            onChange={(e) => setComName(e.target.value)}
            value={comName}
            required="required"
            />
            <div className='name'>
              <p>Upload an image as a thumbnail for your work!</p>
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
              {ipfsImageUrl && (
                <>
                  <img className="image-preview" src={ipfsImageUrl} />
                </>
              )}
            </div>
            <div className='name'>
              <textarea
                maxlength="140"
                disabled={disabled}
                aria-label="update Bio"
                placeholder='You have 140 characters to tell everyone what your new community is about!'
                onChange={(e) => setNewBio(e.target.value)}
                value={newBio}
                >
              </textarea>
            </div>
            <div className='name'>
              <p>By publishing, you certify that you have read and understood the&nbsp; 
                <Linkable>
                  <a 
                  href="/code"
                  target="_blank"
                  >
                    code of conduct
                  </a>
                </Linkable>
                &nbsp;for communities created on Oustro. 
                <br />
                <br />
                Once created, community details cannot be changed.</p>
            </div>
            <div className='name'>
              <CallToAction
              color="primary"
              size="sm"
              onClick={createComm}
              disabled={disabled}
              >
                Create Community
              </CallToAction>
            </div>
            {disabled && (
              <div className='name'>
                Please wait
              </div>
            )}
            {tokenz && (
              <div className='name'>
                <CallToAction
                color="primary"
                size="sm"
                outline="none"
                onPress={copyLink}
                leadingIcon={MonochromeIcons.Copy}
                >
                  Share your community
                </CallToAction>
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
        
        p {
          margin-bottom: 10px;
        }

        h2 {
          font-size: 16px;
          margin: 20px;
          min-height: 28px;
        }     
        
        textarea {
          min-width: 380px;
          min-height: 150px;
          border-radius: 10px;
          resize: none;
          outline: none;
          font-family: Verdana;
          font-size: 15px;
          transition: 0.2s;
          border: 1px solid #E5E5E5;
          padding: 10px;
        }
        textarea:hover {
          outline: none !important;
          border: 1px solid #6851FF;
        }
        textarea:focus {
          transition: 0.2s;
          outline: none !important;
          border: 1px solid #6851FF;
          box-shadow: 0 0 1px 2px #6851FF; 
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

        .image-preview {
          border-radius: 15px;
          max-width: 200px;
          max-height: 200px;
          margin-top: 20px;
        }

        .name {
          margin-top: 30px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Mint;
