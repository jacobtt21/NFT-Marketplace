import React, { useEffect, useContext, useState, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abiU } from '../contracts/abiU';
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
  const [bio, setBio] = useState('');
  const [newBio, setNewBio] = useState('');
  const [userVerify, setUserVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createToast } = useToast();
  const [ipfsImageUrl, setIpfsImageUrl] = useState('');
  const imageInputRef = useRef();
  const router = useRouter()

  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
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
    const userProfiles = await contractUser.methods.getAllUsers().call();
    console.log(userProfiles)
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (user.publicAddress).toUpperCase()) {
        setUsername(userProfiles[i].username);
        setDP(userProfiles[i].displayPic);
        setUserVerify(userProfiles[i].verify);
        setBio(userProfiles[i].bio);
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

  const changeBio = async () => {
    setDisabled1(true)
    if (newBio === "") {
      createToast({
        message: 'Missing Bio',
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
      .changeBio(user.publicAddress, newBio)
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
        <title>Edit Profile | Oustro</title>
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
            width={400}
            height={400}
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
          <h2>
            {bio ? (
            <>
              {bio}
            </>
            ) : (
              <>
                Set up your profile by giving yourself a username and profile picture!
              </>
            )}
          </h2>
        </div>
        <div>
          {userName ? (
            <div className='change-img'>
              <div className='newName'>
                <p>Set your new Username</p>
                <TextField
                disabled={disabled1}
                placeholder="Change New Username (A-z, 0-9)"
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
              <div className='newName'>
                <p>Set your new profile pic</p>
                <p>(500 x 500px)</p>
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
                <br />
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
              <p>Change your bio</p>
              <textarea
              aria-label="update Bio"
              placeholder='This bio is all about you, add whatever you want!'
              onChange={(e) => setNewBio(e.target.value)}
              value={newBio}
              >
              </textarea>
              <CallToAction
              disabled={disabled1}
              color="primary"
              size="md"
              style={{
                marginTop: 10
              }}
              onClick={changeBio}
              >
                Update bio
              </CallToAction>
            </div>
          ) : (
            <div className='change-img'>
              <div className='newName'>
                <p>Set your new Username</p>
                <TextField
                disabled={disabled1}
                placeholder="Only numbers and letters"
                type="text"
                onChange={(e) => setNewUserName(e.target.value)}
                value={newUserName}
                >
                </TextField>
              </div>
              <div className='newName2'>
                <p>Set your new profile pic</p>
                <p>(500 x 500px)</p>
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
              onClick={createProfile}
              >
                Set Profile
              </CallToAction>
            </div>
          )}
          <div
          style={{
          textAlign: 'center',
          marginTop: 40
          }}
          >
            {waiting && (
              <h3>Please Wait</h3>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .newName {
          padding: 30px;
          border-bottom:2px solid #f0f0f0;
        }
        .newName2 {
          padding: 30px;
        }
        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 30px;
          margin-top: 0px;
          align-items: center;
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
        h1 {
          margin-top: 30px;
          font-weight: bold;
          font-size: 28px;
          margin-bottom: 30px;
          text-align: center;
        }
        h2 {
          margin-top: 30px;
          text-align: center;
          font-weight: bold;
          font-size: 18px;
        }
        .profile-change {
          text-align: center;
          width: 500px;
          margin: auto;
        }
        p {
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .profile-container {
          margin-right: 20px;
        }
        .profile {
          text-align: center;
        }
        .change-img {
          width: 380px;
          text-align: center;
          margin: auto;
        }
        .profile-img {
          border-radius: 200px;
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
