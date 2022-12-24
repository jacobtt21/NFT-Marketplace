import React, { useEffect, useContext, useState, useRef } from 'react';
import { UserContext } from '../lib/UserContext';
import { web3 } from '../lib/magic';
import { abiU } from '../contracts/abiU';
import Loading from '../components/Loading';
import { useToast, CallToAction, TextField } from '@magiclabs/ui';
import Head from 'next/head';
import { create } from 'ipfs-http-client';
import { useRouter } from 'next/router'
import Popup from 'reactjs-popup';

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
  const [hovering, setHovering] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contractUser = new web3.eth.Contract(abiU, userAddress);

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
      closeModal()
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
        message: 'Wallet Balance Too Low to change your profile picture (need at least 0.5 Matic for gas fees)',
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
        message: 'Wallet Balance Too Low to change your profile picture (need at least 0.5 Matic for gas fees)',
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
      setDisabled1(false);
      setWaiting(false);
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
        message: 'Wallet Balance Too Low to change your profile picture (need at least 0.5 Matic for gas fees)',
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
        message: 'Wallet Balance Too Low to change your profile picture (need at least 0.5 Matic for gas fees)',
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

  const contentStyle = {
    background: "rgba(255,255,255, 1)",
    borderRadius: 15,
    padding: 20,
    width: 400,
    border: "none",
    textAlign: "center"
  };

  const save = async () => {
    if (newUserName !== "") {
      await changeUsername()
    }
    if (newBio !== "") {
      await changeBio()
    }
    if (ipfsImageUrl) {
      await changeProfile()
    }
    router.reload(window.location.pathname);
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
      <div className='info'>
        <h1>Your Oustro Profile</h1>
        <p>Express yourself and feel at home here on Oustro.</p>
      </div>
      <div className='card'>
        <div className='dp'>
          <img
            src={ipfsImageUrl ? ipfsImageUrl : dp ? dp : "/default.png"}
            width={400}
            height={400}
            className="profile-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
          />
        </div>
        <div className='dpEdit'>
          <CallToAction
          disabled={disabled1}
          color="primary"
          size="sm"
          onClick={() => setOpen(o => !o)}
          >
            Edit Display Image
          </CallToAction>
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
            <div className='newImage'>
              <p>Upload A New Profile Picture</p>
              <input 
              type="file"
              onChange={onImageUpload}
              ref={imageInputRef}
              disabled={disabled1}
              accept="image/*" />
            </div>
            {disabled1 && (
              <div className='message'>
                <CallToAction
                size='sm'
                outline
                >
                  Please wait
                </CallToAction>
              </div>
            )}
          </Popup>
        </div>
        <div className='username'>
          <h3>Update your Username</h3>
          <TextField
          disabled={disabled1}
          placeholder={userName ? (userName) : (user.publicAddress)}
          type="text"
          onChange={(e) => setNewUserName(e.target.value)}
          value={newUserName}
          >
          </TextField>
          
        </div>
        {userName && (
          <div className='bio'>
            <h3>Update your Bio</h3>
            <textarea
            disabled={disabled1}
            aria-label="update Bio"
            placeholder={bio ? bio : "I'm new Here!"}
            onChange={(e) => setNewBio(e.target.value)}
            value={newBio}
            >
            </textarea>
          </div>
        )}
        <div className='submit'>
          <CallToAction
          onClick={userName ? save : createProfile}
          disabled={disabled1}
          >
            {userName ? "Save Profile" : "Create Profile"}
          </CallToAction>
        </div>
        {disabled1 && (
          <div className='messageFull'>
            <CallToAction
            size='lg'
            outline
            >
              Please wait
            </CallToAction>
          </div>
        )}
      </div>
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

      h3 {
        margin-bottom: 10px;
      }

      .profile-img {
        border-radius: 200px;
      }

      .card {
        max-width: 489px;
        text-align: left;
        margin: 0 auto;
        padding: 40px;
        border-radius: 30px;
        border: 1px solid #f9f9f9;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
      }

      .dp {
        text-align: center;
      }

      .submit {
        text-align: center;
      }

      .dpEdit {
        text-align: center;
        margin-top: 20px;
      }

      .username {
        font-size: 20px;
        max-width: 600px;
        margin: 60px auto;
      }

      .image-preview {
        border-radius: 100px;
        width: 200px;
        height: 200px;
        margin: 20px auto;
      }

      .verified {
        margin-top: 10px;
        text-align: center;
      }

      .bio {
        margin: 30px auto;
        font-size: 20px;
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

      .closePop {
        margin-top: -40px;
        text-align: right;
        margin-right: -40px;
      }

      .message {
        margin-top: 20px;
      }

      .messageFull {
        margin-top: 40px;
        text-align: center;
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

      textarea {
        min-width: 95%;
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
       
      `}</style>
    </div>
  ) : (
    <Loading />
  );
}
