import { MonochromeIcons, TextButton } from '@magiclabs/ui';
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
        <div className='align'>
          <div className='toc'>
            <h6>
              <TextButton>
                Intro
              </TextButton>
            </h6>
            <h6>
              <TextButton>
                Rules
              </TextButton>
            </h6>
            <h6>
              <Link
              href="/code"
              >
                <TextButton>
                  How you can help
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="/code"
              >
                <TextButton>
                  What happens after
                </TextButton>
              </Link>
            </h6>
            <h6>
              <Link
              href="/code"
              >
                <TextButton>
                  Conclusion
                </TextButton>
              </Link>
            </h6>
          </div>
          <div>
            <h1>Oustro's Code of Conduct</h1>
            <h2>Intro</h2>
            <h3>At Oustro, we strive to promote the freedom of personal expression. Our aim is to build a platform for our users to formulate ideas, inspire movements, and unite over common passions. Oustro does not tolerate any content deemed dangerous to either the Oustro community or the world. Oustro reserves the right to remove any uploads to the platform if deemed a violation of any of the following:</h3>
            <h2>Rules</h2>
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
            <h2>How you can help</h2>
            <h3>If you see something that goes against any of our guidelines, please help us locate it as soon as possible! Every post contains a button to allow a user to report the material, which will be reviewed by our team immediately.</h3>
            <h2>What happens after</h2>
            <h3>If a user has their work removed, they will be notified via their listed email. The email shall contain an explanation of the removal, paired with a link to appeal if the user deems the decision unjust. If the removal of the material is upheld, the work will not be published back to the site.</h3>
            <h2>Conclusion</h2>
            <h3>Everyone is welcome here, and we will forever stand by that. Let’s work together to make Oustro a safe community not only for ourselves, but for the entire world.</h3>
          </div>
        </div>
      </div>
      <style jsx>{`
        .align {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1.5fr 6fr;
          margin-bottom: 30px;
          margin-top: 80px;
        }
        .toc {
          padding: 30px;
        }
        h1 {
          text-align: center;
          font-size: 50px;
          font-weight: bold;
          margin-bottom: 25px;
        }
        h2 {
          font-size: 30px;
          font-weight: bold;
          margin-left: 40px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        h3 {
          font-size: 20px;
          margin-left: 40px;
        }
        h6 {
          margin-left: 40px;
          margin-bottom: 15px;
        }
      `}</style>
    </>
  );
}
