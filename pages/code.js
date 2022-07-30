import { CallToAction, TextButton } from '@magiclabs/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>Code of Conduct | Oustro</title>
        <meta name="description" content="Learn more about Oustro" />
        <link
          rel="canonical"
          href="https://www.oustro.xyz/about"
          key="canonical"
        />
      </Head>
      <div className='landing'>
        <div className='holder'>
          <h1>Oustro's Code of Conduct</h1>
          <br />
          <h5>
          At Oustro, we strive to promote the freedom of personal expression. Our aim is to build a platform for our 
          users to formulate ideas, inspire movements, and unite over common passions. Oustro does not tolerate any content 
          deemed dangerous to either the Oustro community or the world. Oustro reserves the right to remove any uploads to 
          the platform if deemed a violation of any of the following:
          </h5>
          <div className='align'>
            <div>
              <img 
                src="https://raw.githubusercontent.com/Oustro/OustroImages/691249f84726d76f07e7028aab21b393fbd757fa/11.svg"
                width="500" 
                alt="" 
              /> 
            </div>  
            <div>
              <h6>
                1. Hate speech/abuse/bullying directed toward any group
              </h6>
              <h6>
                2. Allusion to, or intent of inciting violence
              </h6>
              <h6>
                3. Theft of property (whether intellectual or literal, all work must be 
                original or with written consent by the original owner)
              </h6>
              <h6>
                4. Illegal content. This includes, but is not limited to: terrorism, 
                organized crime, the selling of firearms or drugs
              </h6>
              <h6>
                5. Pornography (nudity is allowed in certain cases such as art, sculptures, biology, academia)
              </h6>
              <h6>
                6. Graphic Violence outside of educational purposes
              </h6>
              <h6>
                7. Promotion of self-harm
              </h6>
            </div>        
          </div>
          <div className='mi'>
            <h5>
              If you see something that goes against any of our guidelines, please help us locate it as soon as possible! 
              Every post contains a button to allow a user to report the material, which will be reviewed by our team 
              immediately.
            </h5> 
          </div> 
          <div className='mi'>
            <h5>
            If a user has their work removed, they will be notified via their listed email. The email shall contain an 
            explanation of the removal, paired with a link to appeal if the user deems the decision unjust. If the removal 
            of the material is upheld, the work will not be published back to the site.
            </h5> 
          </div> 
          <div className='mi'>
            <h5>
            Everyone is welcome here, and we will forever stand by that. Let’s work together to 
            make Oustro a safe community not only for ourselves, but for the entire world.
            </h5> 
          </div>  
        </div>
        <style jsx>{`
          h1 {
            font-size: 35px;
            font-weight: bold;
          }
          h5 {
            font-size: 20px;
          }
          .align {
            padding: 20px;
            display: grid;
            grid-gap: 20px;
            grid-template-columns: 1fr 1fr;
            margin-bottom: 30px;
            margin-top: 40px;
          }
          .mi {
            margin-bottom: 50px;
            font-size: 35px;
          }
          .holder {
            margin-top: 30px;
            border-bottom:1px solid #f0f0f0;
          }
          h6 {
            margin-bottom: 20px;
            font-size: 20px;
            line-height: 1.6;
            text-align: left
          }
          .landing {
            text-align:center;
            width: 75%;
            margin: auto;
          }

          .footer {
            padding:15px;
            border-top:1px solid #f0f0f0;
            margin:80px auto 10px;
            text-align:center;
            font-size:15px
          }
        `}</style>
      </div>
    </>
  );
}
