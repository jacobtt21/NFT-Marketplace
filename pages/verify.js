export default function About() {
  return (
    <>
    <div className='landing'>
      <h1>
          Verification on Oustro Explained
      </h1>
      <div className="mint-container" id="mission">
          <h2>So you want to know about that purple check?</h2>
          <br />
          <img
          src="/verify.png"
          width={300}
          className="nft-img"
          onError={(e) => (e.target.src = '/fallback.jpeg')}
          />
          <br />
          <h3>Verification on Oustro is actually quite simple, here is what we look for before a work gets the checkmark:</h3>
          <div className="explain">
            <h4>1. Is this work popular?</h4>
            <br />
            <h5>
              we need to ensure that the works have a notable audience in order to merit us checking whether or not
              it should be reviewed for verification.
              </h5>
          </div>
          <div className="explain">
            <h4>2. Is this work original?</h4>
            <br />
            <h5>
              Original works can only be verified, some execptions can be made, but the original creator of the work itself
              must approve of the work being posted on Oustro before it can be verified.
            </h5>
          </div>
          <br />
          <br />
          <h3>And that's it, works are reviewd during off weekends and are verified throughout the week, every week.</h3>
        </div>
      <div className='footer'>
        <p>2023 Oustro Inc. v2</p>
      </div>
      <style jsx>{`
      .mint-container {
        max-width: 400px;
        text-align: center;
        margin: 20px auto;
        padding: 40px;
        border-radius: 8px;
        border: 1px solid #f9f9f9;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
        }
        .nft-img {
          max-width: 400px;
          max-height: 400px;
          cursor: pointer;
          border-radius: 8px;
        }
        h1 {
          font-size: 35px;
          font-weight: bold;
        }
        h4 {
          font-size: 20px;
          font-weight: bold;
        }
        h2 {
          font-size: 30px;
        }
        h3 {
          font-size: 20px;
          max-width: 60rem;
          margin: auto;
        }
        .landing {
          text-align:center;
          width: 75%;
          margin: auto;
        }
        .explain {
          text-align: left;
          margin-top: 30px;
        }
        .dis {
          margin-top: 9px;
          margin-bottom: 9px;
          font-size: 11px;
        }

        .footer {
          padding:15px;
          border-top:1px solid #f0f0f0;
          margin:480px auto 10px;
          text-align:center;
          font-size:15px
        }
      `}</style>
    </div>
    </>
  );
}
