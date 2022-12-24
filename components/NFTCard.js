import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link'
import { web3 } from '../lib/magic';
import { abiU } from '../contracts/abiU';
import { CallToAction, TextButton, MonochromeIcons } from '@magiclabs/ui';
import { useRouter } from 'next/router'

// types indicates whether or not it is a regular nft card on the index page or owned card on collection
// status refers to whether or not the NFT is for sale

export default function NFTCard({ nft, price, status, star, check, going }) {
  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contractUser = new web3.eth.Contract(abiU, userAddress);
  const [user] = useContext(UserContext);
  const [hovering, setHovering] = useState(false);
  const [creator, setCreator] = useState(nft.creator);
  const [changed, setChanged] = useState(false);
  const [userVerify, setUserVerify] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if (!user && router.pathname !== '/u/[user]') {
      return;
    }
    getMyNFTs();
  }, [user]);

  const getMyNFTs = async () => {
    console.log(going)
    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (nft.creator).toUpperCase()) {
        setCreator(userProfiles[i].username);
        setChanged(true);
        setUserVerify(userProfiles[i].verify)
      }
    }
  }


  return (
    <>
      <div className="card">
        <div className="nft-img-container">
          <Link href={{pathname: going ? '/[id]' : '/s/[id]', query: { id: nft.tokenID }}}>
            <img
            src={nft.image}
            width={400}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            />
          </Link>
        </div>
        {status ? (
          <div className="pricingOne">
            <CallToAction
            color="primary"
            size="sm"
            outline={hovering ? false : true}
            >
              <img className="image-logo" src={hovering ? "./p.svg" : "./p2.svg"} />
              { (web3.utils.fromWei(price.toString())) } MATIC
            </CallToAction>
          </div>
        ) : (
          <div className="pricingOneTwo">
            <CallToAction
            color="primary"
            size="sm"
            outline={hovering ? false : true}
            >
              If you're reading this, you shouldn't be
            </CallToAction>
          </div>
        )}
        <div className='align'>
          <div>
            <div className='name'>
              <h1 className='nameWords'>
                {nft.name}
              </h1>
            </div>
            {changed ? (
              <div className="name">
                <Link href={{pathname: '/u/[user]', query: { user: nft.creator }}}>
                  <TextButton
                  trailingIcon={userVerify && (MonochromeIcons.SuccessFilled)}
                  >
                    {creator}
                  </TextButton>
                </Link>
              </div>
            ) : (
              <div className="name">
                <Link href={{pathname: '/u/[user]', query: { user: nft.creator }}}>
                  <TextButton
                  trailingIcon={userVerify && (MonochromeIcons.SuccessFilled)}
                  >
                    {creator.substring(0, 6)}...{creator.substring(38)}
                  </TextButton>
                </Link>
              </div>
            )}
          </div>
          <div className="rating">
            <Link href={{pathname: going ? '/[id]' : '/s/[id]', query: { id: nft.tokenID }}}>
              <CallToAction>
                { star } / 5
              </CallToAction>
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .image-logo {
          margin-right: 5px;
          max-width: 20px;
        }

        .nft-img:hover {
          -webkit-filter: brightness(87%);
          box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 16px,
          rgba(0, 0, 0, 0.1) 0px 0px 16px;
          transition: 0.2s;
        }

        .nft-img-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          margin-bottom: 20px;
        }

        .align {
          padding: 20px;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 4fr 1fr;
          margin-bottom: 30px;
          align-items: center;
        }

        .nft-img {
          width: 300px;
          height: 300px;
          cursor: pointer;
          border-radius: 15px;
          transition: 0.2s;
        }

        .name {
          margin-top:-20px;
        }

        .rating {
          margin-right: 10px;
          text-align: right;
        }

        .comms {
          margin-top: 15px;
          margin-bottom: 15px;
          text-align: center;
        }

        .pricingOne {
          margin-top: -50px;
          text-align: center;
        }

        .pricingOneTwo {
          margin-top: -50px;
          visibility: hidden;
        }

        .name2 {
          width: 280px;
          text-align: center;
        }
        .name1 {
          margin-top: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nameWords {
          line-height: 1.6;
          margin-left: 0px;
          font-size: 15px;
        }
        .name3 {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        h6 {
          font-size: 17px;
        }

      `}</style>
    </>
  );
}
