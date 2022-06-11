import { useState, useContext } from 'react';
import { UserContext } from '../../lib/UserContext';
import { TextField, CallToAction } from '@magiclabs/ui';
import Loading from '../../components/Loading';
import { useRouter } from 'next/router'

function Contact() {
    const [user] = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const getformURL = "https://getform.io/f/75702bd8-ad85-44d1-bfcf-0b3cea026d82"
    const router = useRouter();

    const formSubmit = async () => {
        setSending(true)
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("ID", router.query.id);
        formData.append("message", message);
        await fetch(getformURL, {
            method: "POST",
            body: formData
        });
        setMessage('');
        setSending(false)
    };

    return (
        <div>
            {user ? (
                <div>
                   <h1>Report a Work</h1>
                   <h2>Please fill out this form if you see something that doesn't adhere to Oustro's rules</h2>
                   <div className='class-container'>
                        <div className='nname'>
                            <p>All Reports are Investigated</p>
                        </div>
                        <TextField
                        placeholder='Why are you reporting this Work?'
                        className='area'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        > 
                        </TextField>
                        <br />
                        <br />
                        <CallToAction
                        onClick={formSubmit}
                        >
                            Send Report
                        </CallToAction>
                        <br />
                        <br />
                        {sending && (
                            <p>
                                Sending
                            </p>
                        )}
                   </div>
                </div>
            ) : (
                <Loading />
            )}
            <style>{`
                h1 {
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
                .class-container {
                    max-width: 400px;
                    text-align: center;
                    margin: 0 auto;
                    padding: 40px;
                    border-radius: 8px;
                    border: 1px solid #f9f9f9;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
                }
                .nname {
                    font-weight: bold;
                    margin: 15px 15px;
                }
            `}</style>
        </div>
    );
}

export default Contact;
