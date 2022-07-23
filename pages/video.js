import { CallToAction, useToast } from '@magiclabs/ui';
import { UserContext } from '../lib/UserContext';
import { useState, useContext, useRef } from 'react';
import Head from 'next/head';
import { create } from 'ipfs-http-client';
import Loading from '../components/Loading';

export default function About() {
  const [user] = useContext(UserContext);
  const [ipfsWorkUrl, setIpfsWorkUrl] = useState('');
  const client = create('https://ipfs.infura.io:5001/api/v0');
  const imageInputRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const { createToast } = useToast();

  async function onWorkUpload(e) {
      setDisabled(true)
      setIpfsWorkUrl('1');
      const file = e.target.files[0];
      try {
        const ipfsData = await client.add(file);
        const url = `https://ipfs.infura.io/ipfs/${ipfsData.path}`;
        setIpfsWorkUrl(url);
        imageInputRef.current.value = '';
        setDisabled(false)
      } 
      catch (error) {
        console.log(error);
      }
    }

    const copyLink = async () => {
      navigator.clipboard.writeText('<!DOCTYPE html><html><body background-color="black"><video width="99%" controls><source src="'+ipfsWorkUrl+'" type="video/mp4"></video></body></html>');
      createToast({
        message: 'Link Copied!',
        type: 'success',
        lifespan: 2000,
      });
    };

  return (
    <>
      {user ? (
        <>
          <Head>
            <title>Upload a Video | Oustro</title>
            <meta name="description" content="Learn more about Oustro" />
            <link
            rel="canonical"
            href="https://www.oustro.xyz/about"
            key="canonical"
            />
          </Head>
          <h3>Get Your Video on Oustro</h3>
          <h2>Once you upload a video, just copy the code we provide into a HTML file and upload that onto Oustro!</h2>
          <div className='mint-container'>
            <div className='nname'>
              <p>Upload your video! (MP4)</p>
            </div>
            <input
            type="file"
            onChange={onWorkUpload}
            ref={imageInputRef}
            disabled={disabled}
            accept=".mp4"
            required="required"
            >
            </input>
            <br />
            {ipfsWorkUrl === '1' ? (
              <h1
              style={{
                marginTop: 30
              }}
              >Uploading...</h1>
            ) : ipfsWorkUrl === '' ? (
              <>
              </>
            ) : (
              <>
                <video 
                controls
                style={{
                  height: 300,
                  width: 400,
                  marginBottom: 15
                }}
                >
                  <source src={ipfsWorkUrl} type="video/mp4" />
                </video>
                <CallToAction
                color="primary"
                size="sm"
                outline="none"
                onPress={copyLink}
                >
                  Copy HTML Code
                </CallToAction>
              </>
            )}
          </div>
          <style jsx>{`
            .nname {
              font-weight: bold;
              margin: 15px;
            }
            h3 {
              font-weight: bold;
              font-size: 28px;
              margin: 20px;
              min-height: 28px;
            }
    
            h2 {
              font-size: 16px;
              margin: 20px;
              min-height: 28px;
            }
            .mint-container {
              max-width: 400px;
              text-align: center;
              margin: 0 auto;
              padding: 40px;
              border-radius: 30px;
              border: 1px solid #f9f9f9;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
            }
          `}</style>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
