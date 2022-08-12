import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link';
import { TextButton, CallToAction, MonochromeIcons } from '@magiclabs/ui';
import { abiU } from '../contracts/abiU';
import { web3 } from '../lib/magic';

export default function NFTCard({ comm }) {
  const [user] = useContext(UserContext);
  const [creator, setCreator] = useState(comm.creator);
  const [changed, setChanged] = useState(false);
  const [userVerify, setUserVerify] = useState(false);

  const userAddress = process.env.NEXT_PUBLIC_USER_ADDRESS;
  const contractUser = new web3.eth.Contract(abiU, userAddress);

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyUsers();
  }, [user]);

  const getMyUsers = async () => {
    const userProfiles = await contractUser.methods.getAllUsers().call();
    var i;
    for (i = 0; i < userProfiles.length; ++i) {
      if ((userProfiles[i].userAddress).toUpperCase() === (comm.creator).toUpperCase()) {
        setCreator(userProfiles[i].username);
        setChanged(true);
        setUserVerify(userProfiles[i].verify)
      }
    }
  }
  
  return (
    <>
      <Link href={{pathname: '/community/[cname]', query: { cname: comm.cname }}}>
          <div className="card">
            <div className='align'>
              <div className='name'>
                <img
                src={comm.cPic}
                width={250}
                height={250}
                className="nft-img"
                onError={(e) => (e.target.src = '/fallback.jpeg')}
                alt={comm.cname}
                />
              </div>
              <div className="name2">
                <h1>{comm.cname}</h1>
                <h2>
                {changed ? (
                    <Link href={{pathname: '/u/[user]', query: { user: comm.creator }}}>
                      <TextButton
                      trailingIcon={userVerify && (MonochromeIcons.SuccessFilled)}
                      >
                        {creator}
                      </TextButton>
                    </Link>
                ) : (
                    <Link href={{pathname: '/u/[user]', query: { user: comm.creator }}}>
                      <TextButton
                      trailingIcon={userVerify && (MonochromeIcons.SuccessFilled)}
                      >
                        {creator.substring(0, 6)}...{creator.substring(38)}
                      </TextButton>
                    </Link>
                )}
                </h2>
                <h2>{comm.bio}</h2>
                <h3>
                  <CallToAction
                  size='lg'
                  outline
                  >
                    {comm.contributors}&nbsp;Contributrion
                  </CallToAction>
                </h3>
              </div>
            </div>
          </div>
        </Link>
      <style jsx>{`
        h1 {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        h2 {
          line-height: 1.6;
          margin-bottom: 25px;
        }
        h3 {
          font-weight: bold;
        }
        .align {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }
        .card {
          border-radius: 20px;
          padding: 10px;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 16px,
            rgba(0, 0, 0, 0.05) 0px 0px 16px;
          transition: 0.2s;
        }

        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 16px,
            rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }

        .nft-img {
          max-width: 300px;
          max-height: 300px;
          cursor: pointer;
          border-radius: 15px;
        }

        .name {
          margin-top: 10px;
          text-align: center;
        }
        .name2 {
          padding: 20px;
          margin-top: 10px;
          text-align: center;
          border-left: 2px solid #f0f0f0;
        }
      `}</style>
    </>
  );
}
