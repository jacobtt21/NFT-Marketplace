import React, { useEffect, useContext, useState, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { abiU } from '../contracts/abiU';
import Grid from '../components/Grid';
import Loading from '../components/Loading';
import { useToast, MonochromeIcons, TextButton, CallToAction, TextField } from '@magiclabs/ui';
import Head from 'next/head';
import { create } from 'ipfs-http-client';
import { useRouter } from 'next/router'

export default function Index() {
  const [disabled1, setDisabled1] = useState(false);
  const [user] = useContext(UserContext);
  const [userName, setUsername] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [dp, setDP] = useState('');
  const [userVerify, setUserVerify] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myPrices, setMyPrices] = useState();
  const [myStatus, setMyStatus] = useState();
  const [myVerify, setMyVerify] = useState();
  const [myNums, setMyNums] = useState();
  const [myStars, setMyStars] = useState();
  const [loading, setLoading] = useState(false);
  const { createToast } = useToast();
  const [ipfsImageUrl, setIpfsImageUrl] = useState('');
  const imageInputRef = useRef();
  const router = useRouter()

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const contractUser = new web3.eth.Contract(abiU, userAddress);

  const client = create('https://ipfs.infura.io:5001');

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

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyNFTs();
  }, [user]);

  const getMyNFTs = async () => {
    setLoading(true);

    // Get array of token URI's stored in contract for given user
    // Each URI is an IPFS url containing json metadata about the NFT, such as image and name
    const tokenURIs = await contract.methods.getNFTsByOwner(user.publicAddress).call();

    let prices = []
    let onMarket = []
    let nums = [];
    let stars = []
    let nfts = [];
    let verify = [];

    var i = 0;
    for (i = tokenURIs.length - 1; i >= 0; --i) {
      prices.push(tokenURIs[i][2]);
      onMarket.push(tokenURIs[i][6]);
      nums.push(tokenURIs[i][5]);
      stars.push(tokenURIs[i][4]);
      verify.push(tokenURIs[i][7]);
      const response = await fetch(tokenURIs[i].data);
      const data = await response.json();
      nfts.push(data);
    }

    setMyNFTs(nfts);
    setMyPrices(prices);
    setMyStatus(onMarket);
    setMyNums(nums);
    setMyVerify(verify);
    setMyStars(stars);
    setLoading(false);

    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (user.publicAddress).toUpperCase()) {
        setUsername(userProfiles[i].username);
        setDP(userProfiles[i].displayPic);
        setUserVerify(userProfiles[i].verify)
      }
    }
  };

  const changeUsername = async () => {
    setDisabled1(true)
    if (newUserName === '') {
      createToast({
        message: 'Missing username',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    if (!/^[0-9a-zA-Z]+$/.test(newUserName)) {
      createToast({
        message: 'Only number and letters allowed',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].username).toUpperCase() === newUserName.toUpperCase()) {
        createToast({
          message: 'Username taken',
          type: 'error',
          lifespan: 2000,
        });
        setDisabled1(false)
        return;
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
      setDisabled1(false)
      return;
    }
    try {
      setWaiting(true)
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contractUser.methods
      .changeUsername(user.publicAddress, newUserName)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setDisabled1(false);
      setWaiting(false);
      router.reload(window.location.pathname);
    }
    catch (error) {
      console.log(error);
      setDisabled1(false)
      setWaiting(false)
    }
  }

  const changeProfile = async () => {
    setDisabled1(true)
    if (!ipfsImageUrl) {
      createToast({
        message: 'Missing an image',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const MaticBalance = web3.utils.fromWei(weiBalance);
    if (MaticBalance < 0.5) {
      createToast({
        message: 'Wallet Balance Too Low to change your profile picture (need at least 0.5 Matic)',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    try {
      setWaiting(true)
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contractUser.methods
      .changeDP(user.publicAddress, ipfsImageUrl)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setDisabled1(false);
      setWaiting(false);
      router.reload(window.location.pathname);
    }
    catch (error) {
      console.log(error);
      setDisabled1(false)
      setWaiting(false)
    }
  }

  const createProfile = async () => {
    setDisabled1(true)
    if (!ipfsImageUrl) {
      createToast({
        message: 'Missing an image',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    if (newUserName === '') {
      createToast({
        message: 'Missing username',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    if (!/^[0-9a-zA-Z]+$/.test(newUserName)) {
      createToast({
        message: 'Only number and letters allowed',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    console.log()
    for (i = 0; i < userProfiles.length; ++i) {
      console.log((userProfiles[i].username).toUpperCase())
      console.log(newUserName.toUpperCase())
      if ((userProfiles[i].username).toUpperCase() === newUserName.toUpperCase()) {
        createToast({
          message: 'Username taken',
          type: 'error',
          lifespan: 2000,
        });
        setDisabled1(false)
        return;
      }
      if ((userProfiles[i].userAddress).toUpperCase() === (user.publicAddress).toUpperCase()) {
        createToast({
          message: 'An Error Occurred',
          type: 'error',
          lifespan: 2000,
        });
        setDisabled1(false)
        return;
      }
    }
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const MaticBalance = web3.utils.fromWei(weiBalance);
    if (MaticBalance < 100) {
      createToast({
        message: 'Wallet Balance Too Low to change your profile picture (need at least 0.5 Matic)',
        type: 'error',
        lifespan: 2000,
      });
      setDisabled1(false)
      return;
    }
    try {
      setWaiting(true)
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contractUser.methods
      .createUser(user.publicAddress, newUserName, ipfsImageUrl)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setDisabled1(false);
      setWaiting(false);
      router.reload(window.location.pathname);
    }
    catch (error) {
      console.log(error);
      setDisabled1(false)
      setWaiting(false)
    }
  }

  return user ? (
    <div>
      <Head>
        <title>Your Collection | Oustro</title>
        <link
          rel="canonical"
          href="https://www.oustro.xyz/showcase"
          key="canonical"
        />
      </Head>
      <div className='align'>
        <div className='profile'>
          <img
            src={dp ? dp : "/default.png"}
            width={300}
            height={300}
            className="profile-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
          />
          <h1>
            {userName ? (userName) : (user.publicAddress)}
            {userVerify && (
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}
              ></TextButton>
            )}
          </h1>
        </div>
        <div>
          {userName ? (
            <div className='align'>
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <TextField
                disabled={disabled1}
                label={userName + " is becoming..."}
                placeholder="Only number and letters"
                type="text"
                onChange={(e) => setNewUserName(e.target.value)}
                value={newUserName}
                >

                </TextField>
                <CallToAction
                style={{
                  marginTop: 20
                }}
                disabled={disabled1}
                color="primary"
                size="md"
                onClick={changeUsername}
                >
                  Change username
                </CallToAction>
              </div>
              <div>
                <input
                  type="file"
                  onChange={onImageUpload}
                  ref={imageInputRef}
                  disabled={disabled1}
                  accept="image/*"
                  required="required"
                >
                </input>
                {ipfsImageUrl && (
                  <>
                    <br />
                    <br />
                    <img className="dp-preview" src={ipfsImageUrl} />
                  </>
                )}
                <CallToAction
                disabled={disabled1}
                color="primary"
                size="md"
                style={{
                  marginTop: 10
                }}
                onClick={changeProfile}
                >
                  Change profile picture
                </CallToAction>
              </div>
            </div>
          ) : (
            <div className='align'>
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <TextField
                disabled={disabled1}
                label={user.publicAddress + " is becoming..."}
                placeholder="Only numbers and letters"
                type="text"
                onChange={(e) => setNewUserName(e.target.value)}
                value={newUserName}
                >
                </TextField>
              </div>
              <div>
                <input
                  type="file"
                  onChange={onImageUpload}
                  ref={imageInputRef}
                  disabled={disabled1}
                  accept="image/*"
                  required="required"
                >
                </input>
                {ipfsImageUrl && (
                  <>
                    <br />
                    <br />
                    <img className="dp-preview" src={ipfsImageUrl} />
                  </>
                )}
              </div>
              <CallToAction
            disabled={disabled1}
            color="primary"
            size="md"
            style={{
              marginTop: 10,
              marginBottom: 20
            }}
            onClick={createProfile}
            >
              Set Profile
            </CallToAction>
            </div>

          )}
          <div
          style={{
          textAlign: 'center'
          }}
          >
            {waiting && (
              <h3>Please Wait</h3>
            )}
          </div>
        </div>
      </div>
      <Grid loading={loading} nfts={myNFTs} prices={myPrices} statuses={myStatus} type={false} stars={myStars} nums={myNums} checkmark={myVerify} go={true} takeAway={false} />
      <style>{`
        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 30px;
          margin-top: 0px;
          align-items: center;
        }
        h1 {
          margin-top: 30px;
          font-weight: bold;
          font-size: 28px;
        }
        .profile-change {
          text-align: center;
          width: 500px;
          margin: auto;
        }
        p {
          margin: 25px;
          min-height: 28px;
        }
        .profile-container {
          margin-right: 20px;
        }
        .profile {
          text-align: center;
        }
        .profile-img {
          border-radius: 150px;
        }
        .dp-preview {
          border-radius: 150px;
          max-width: 200px;
          max-height: 200px;
        }
      `}</style>
    </div>
  ) : (
    <Loading />
  );
}
