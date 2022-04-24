import { useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link'
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { TextField, CallToAction } from '@magiclabs/ui';
import { useRouter } from 'next/router'


export default function NFTCard({ nft, price, status, types, star, num }) {
  const [user] = useContext(UserContext);
  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  const [newPrice, setNewPrice] = useState();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter()

  const changePrice = async () => {
    try {
      setDisabled(true);
      const receipt = await contract.methods.changePrice(parseInt(nft.tokenID), web3.utils.toWei(newPrice), user.publicAddress).send({ from: user.publicAddress });
      console.log(receipt)
      setNewPrice('');
      setDisabled(false);
      router.reload(window.location.pathname);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  }

  const changeStatus = async () => {
    try {
      setDisabled(true);
      const receipt = await contract.methods.changeMarketStatus(parseInt(nft.tokenID), user.publicAddress).send({ from: user.publicAddress });
      console.log(receipt)
      setDisabled(false);
      router.reload(window.location.pathname);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  }

  return (
    <>
      <div className="card">
      <div className="name">
        <Link href={{pathname: '/[id]', query: { id: nft.tokenID }}}>
          <CallToAction>
          { star } / 5
          </CallToAction></Link> from { num } ratings
      </div>
        <Link href={nft.work}>
          <div className="nft-img-container">
            <img
            src={nft.image}
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />
          </div>
        </Link>
        <div className="name">{nft.name}</div>
        <div className="name">by {nft.creator.substring(0, 6)}..{nft.creator.substring(38)}</div>
        <br />
        {types ? (
          <>
            {status && (
              <>
                <div className="name">
                <Link href={{pathname: '/[id]', query: { id: nft.tokenID }}}>
                    <CallToAction
                    color="primary"
                    size="sm"
                    outline="none"
                    >
                      { web3.utils.fromWei(price) } ETH
                    </CallToAction>
                  </Link>
                  </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="name">
              current price: { web3.utils.fromWei(price) } ETH </div>
              <div className="name">
            <TextField
              disabled={disabled}
              placeholder="New Price"
              type="number"
              onChange={(e) => setNewPrice(e.target.value)}
              value={newPrice}
            />
            <br />
            <CallToAction
            disabled={disabled}
            color="primary"
            size="sm"
            onClick={changePrice}
            >
            Change Price
            </CallToAction>
            <br />
            </div>
            {status ? (
              <>
              <div className="name">
                <CallToAction
                disabled={disabled}
                color="primary"
                size="sm"
                onClick={changeStatus}
                >
                Take Off Market
                </CallToAction>
                </div>
              </>
            ) : (
              <>
              <div className="name">
                <CallToAction
                disabled={disabled}
                color="primary"
                size="sm"
                onClick={changeStatus}
                >
                Put On Market
                </CallToAction>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <style>{`
        .card {
          border-radius: 8px;
          padding: 15px;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 16px,
            rgba(0, 0, 0, 0.05) 0px 0px 16px;
        }

        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px,
            rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }

        .nft-img-container {
          min-width: 200px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nft-img {
          max-width: 200px;
          max-height: 200px;
          cursor: pointer;
          border-radius: 8px;
        }

        .name {
          margin-top: 10px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
