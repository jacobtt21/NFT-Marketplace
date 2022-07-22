import { useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link'
import { web3 } from '../lib/magic';
import { abi } from '../contracts/abi';
import { TextField, CallToAction, TextButton, MonochromeIcons, useToast } from '@magiclabs/ui';
import { useRouter } from 'next/router'


export default function NFTCard({ nft, price, status, types, star, num, check, going, take }) {
  const contractAddress = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);

  const [user] = useContext(UserContext);
  const [newPrice, setNewPrice] = useState();
  const [disabled, setDisabled] = useState(false);
  const [msg, setMsg] = useState(false);
  const [msg1, setMsg1] = useState(false);
  const { createToast } = useToast();

  var path = '';
  const router = useRouter()

  const changePrice = async () => {
    setDisabled(true);
    const errorsFound = await checkForErrors(2);
    if (errorsFound) {
      return setDisabled(false);
    }
    try {
      setMsg(true);
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contract.methods
      .changePrice(parseInt(nft.tokenID), web3.utils.toWei(newPrice), user.publicAddress)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setNewPrice('');
      setDisabled(false);
      setMsg(false);
      router.reload(window.location.pathname);
    } 
    catch (error) {
      console.log(error);
      setDisabled(false);
      setMsg(false);
    }
  }

  const changeStatus = async () => {
    setDisabled(true);
    const errorsFound = await checkForErrors(1);
    if (errorsFound) { 
      return setDisabled(false);
    }
    try {
      setMsg1(true);
      const response = await fetch('https://gasstation-mainnet.matic.network/v2');
      const next = await response.json();
      const receipt = await contract.methods
      .changeMarketStatus(parseInt(nft.tokenID), user.publicAddress)
      .send({ 
        from: user.publicAddress,
        gas: 1000000,
        maxPriorityFeePerGas: web3.utils.toWei((parseInt(next.fast.maxPriorityFee)).toString(), "Gwei")
      });
      console.log(receipt)
      setDisabled(false);
      setMsg1(false);
      router.reload(window.location.pathname);
    } 
    catch (error) {
      console.log(error);
      setDisabled(false);
      setMsg1(false);
    }
  }

  const checkForErrors = async (val) => {
    // Throw error if missing input values
    var reason = '';
    if (val === 1) {
      reason = "Take off the Marketplace"
    }
    else if (val === 2) {
      reason = "Change the Price"
    }
    // Throw error if user does not have enough ETH for gas fee
    const weiBalance = await web3.eth.getBalance(user.publicAddress);
    const MaticBalance = web3.utils.fromWei(weiBalance);
    if (MaticBalance < 0.5) {
      createToast({
        message: 'Wallet Balance Too Low to ' + reason,
        type: 'error',
        lifespan: 2000,
      });
      return true;
    }
    // No errors found
    return false;
  };

  if (going) {
    path = "/[id]";
  }
  else {
    path = "/s/[id]"
  }

  return (
    <>
      {take ? (
        <Link href={{pathname: path, query: { id: nft.tokenID }}}>
          <div className="card">
            {going ? (
              <div className="name">
                <Link href={{pathname: '/[id]', query: { id: nft.tokenID }}}>
                  <CallToAction>
                    { star } / 5
                  </CallToAction>
                </Link> from { num } ratings
              </div>
            ) : (
              <div className="name">
                <CallToAction
                color="primary"
                size="sm"
                outline="none">
                  { star } / 5 
                </CallToAction> from { num } ratings
              </div>
            )}
            <div className="nft-img-container">
              <img
              src={nft.image}
              width={300}
              className="nft-img"
              onError={(e) => (e.target.src = '/fallback.jpeg')}
              />
            </div>
            {check === '0' ? (
              <div className='name'>
              <TextButton
              color="primary"
              outline="none"
              >
                {nft.name}
              </TextButton>
            </div>
            ) : check === "1" ? (
              <div className="name">
                <TextButton
                leadingIcon={MonochromeIcons.SuccessFilled}
                color="primary"
                outline="none"
                >
                  {nft.name}
                </TextButton>
              </div> 
            ) : check === "2" ? (
              <div className="name">
                <TextButton
                leadingIcon={MonochromeIcons.AsteriskBold}
                color="primary"
                outline="none"
                >
                  {nft.name}
                </TextButton>
              </div> 
            ) : (
              <div className="name">
                <TextButton
                leadingIcon={MonochromeIcons.Exclaim}
                color="primary"
                outline="none"
                >
                  {nft.name}
                </TextButton>
              </div> 
            )}
            <div className="name">created by {nft.creator.substring(0, 6)}..{nft.creator.substring(38)}</div>
            <br />
            {types ? (
              <>
                {status && (
                  <>
                    <div className="name">
                      <CallToAction
                      color="primary"
                      size="sm"
                      outline="none"
                      >
                        <img className="image-logo" src="/p2.svg" />
                        { web3.utils.fromWei(price) } MATIC
                      </CallToAction>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="name">
                  current price: { web3.utils.fromWei(price) } MATIC
                </div>
                <div className="name">
                  <TextField
                  disabled={disabled}
                  placeholder="New Price"
                  type="number"
                  onChange={(e) => setNewPrice(e.target.value)}
                  value={newPrice}
                  />
                  <br />
                  <TextButton
                  disabled={disabled}
                  color="primary"
                  size="sm"
                  onClick={changePrice}
                  >
                    Change Price
                  </TextButton>
                  <br />
                  <br />
                </div>
                { price === 0 ? ( 
                  <>
                  yee
                  </>
                ) : (
                  <>
                  </>
                )}
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
        </Link>
      ) : (
        <div className="card">
          {going ? (
            <div className="name">
              <Link href={{pathname: '/[id]', query: { id: nft.tokenID }}}>
                <CallToAction>
                  { star } / 5
                </CallToAction>
              </Link> from { num } ratings
            </div>
          ) : (
            <div className="name">
              <CallToAction
              color="primary"
              size="sm"
              outline="none">
                { star } / 5 
              </CallToAction> from { num } ratings
            </div>
          )}
          <div className="nft-img-container">
            <img
            src={nft.image}
            width={300}
            className="nft-img"
            onError={(e) => (e.target.src = '/fallback.jpeg')}
            />
          </div>
          {check === '0' ? (
            <div className='name'>
              <TextButton
              color="primary"
              outline="none"
              >
                {nft.name}
              </TextButton>
            </div>
          ) : check === "1" ? (
            <div className="name">
              <TextButton
              leadingIcon={MonochromeIcons.SuccessFilled}
              color="primary"
              outline="none"
              >
                {nft.name}
              </TextButton>
            </div> 
          ) : (
            <div className="name">
              <TextButton
              leadingIcon={MonochromeIcons.Exclaim}
              color="primary"
              outline="none"
              >
                {nft.name}
              </TextButton>
            </div> 
          )}
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
                        { web3.utils.fromWei(price) } MATIC
                      </CallToAction>
                    </Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="name">
                current price: { web3.utils.fromWei(price) } MATIC
              </div>
              <div className="name">
                <TextField
                disabled={disabled}
                placeholder="New Price"
                type="number"
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                />
                <br />
                <TextButton
                disabled={disabled}
                color="primary"
                size="sm"
                onClick={changePrice}
                >
                  Change Price
                </TextButton>
                <br />
                {msg && (
                  <div className='name'>
                    Found the eraser, we'll be back real quick
                  </div>
                )}
                <br />
              </div>
              {price !== '0' && (
                <>
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
                      <br />
                    </>
                  )}
                </>
              )}
              {msg1 && (
                <div className='name'>
                  We're going to the market, need anything?
                </div>
              )}
            </>
          )}
        </div>
      )}
      <style>{`
        .image-logo {
          margin-right: 5px;
          max-width: 20px;
        }
        .card {
          border-radius: 20px;
          padding: 15px;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 16px, rgba(0, 0, 0, 0.05) 0px 0px 16px;
          transition: 0.2s;
        }

        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 16px,
            rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }

        .nft-img-container {
          margin-top: 10px;
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
          border-radius: 15px;
        }

        .name {
          margin-top: 10px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
