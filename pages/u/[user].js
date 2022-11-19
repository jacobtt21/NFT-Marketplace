import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../../lib/UserContext';
import { web3 } from '../../lib/magic';
import { abi } from '../../contracts/abi';
import { abiU } from '../../contracts/abiU';
import Grid from '../../components/Grid';
import Loading from '../../components/Loading';
import { MonochromeIcons, TextButton } from '@magiclabs/ui';

export default function Index() {
  const [user] = useContext(UserContext);
  const [userName, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [dp, setDP] = useState('');
  const [userVerify, setUserVerify] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myPrices, setMyPrices] = useState();
  const [myStatus, setMyStatus] = useState();
  const [myNums, setMyNums] = useState();
  const [myVerify, setMyVerify] = useState();
  const [myStars, setMyStars] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  var route = false;

  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const contractUser = new web3.eth.Contract(abiU, userAddress);

  useEffect(() => {
    if (!router.query.user) {
      return;
    }
    getMyNFTs();
  }, [router.query.user]);

  const getMyNFTs = async () => {
    setLoading(true);

    // Get array of token URI's stored in contract for given user
    // Each URI is an IPFS url containing json metadata about the NFT, such as image and name
    const tokenURIs = await contract.methods.getNFTsByOwner(router.query.user).call();

    let prices = []
    let onMarket = []
    let nums = [];
    let stars = []
    let nfts = [];
    let verify = [];

    var i = 0;

    for (i = tokenURIs.length - 1; i >= 0; --i) {
      if (tokenURIs[i]["show"]) {
        prices.push(tokenURIs[i][2]);
        onMarket.push(tokenURIs[i][6]);
        nums.push(tokenURIs[i][5]);
        stars.push(tokenURIs[i][4]);
        verify.push(tokenURIs[i][7]);
        const response = await fetch(tokenURIs[i].data);
        const data = await response.json();
        nfts.push(data);
      }
    }

    setMyNFTs(nfts);
    setMyVerify(verify);
    setMyPrices(prices);
    setMyStatus(onMarket);
    setMyNums(nums);
    setMyStars(stars);
    setLoading(false);

    setUsername(router.query.user)

    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (router.query.user).toUpperCase()) {
        setUsername(userProfiles[i].username);
        setDP(userProfiles[i].displayPic);
        setUserVerify(userProfiles[i].verify)
        setBio(userProfiles[i].bio)
        return
      }
    }
  };

  if (user) {
    if ((user.publicAddress).toUpperCase() === (router.query.user).toUpperCase()) {
        router.push('/profile');
    }
    route = true;
  }

  return myStars ? (
    <div>
      <div className='profile'>
        <img
          src={dp ? dp : "/default.png"}
          width={300}
          height={300}
          className="profile-img"
          onError={(e) => (e.target.src = '/fallback.jpeg')}
        />
        <h1>
          {userName}
        </h1>
      {userVerify && (
        <TextButton
        leadingIcon={MonochromeIcons.SuccessFilled}
        >
          Verified Account
        </TextButton> 
      )}
      <div className='bio'>
        {bio ? (
          <>
            {bio}
          </>
        ) : (
          <>
            I'm new here!
          </>
        )}
      </div>
      </div>
      <Grid loading={loading} nfts={myNFTs} prices={myPrices} statuses={myStatus} type={true} stars={myStars} nums={myNums} checkmark={myVerify} go={route} takeAway={true} />
      <style>{`
        .profile-img {
          border-radius: 150px;
        }
        .profile {
          text-align: center;
          border-bottom: 2px solid #f0f0f0;
        }
        h1 {
          font-size: 40px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .bio {
          margin: 30px auto;
          background: #f0f0f0;
          font-size: 20px;
          width: 700px;
          padding: 30px;
          border-radius: 20px;
        }
      `}</style>
    </div>
  ) : (
    <Loading />
  );
}
