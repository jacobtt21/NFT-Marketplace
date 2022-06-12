import { useState, useContext } from 'react';
import { UserContext } from '../../lib/UserContext';
import { TextField, CallToAction } from '@magiclabs/ui';
import Loading from '../../components/Loading';

function Contact() {
    const [user] = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const getformURL = "https://getform.io/f/75702bd8-ad85-44d1-bfcf-0b3cea026d82"

    const formSubmit = async () => {
        setSending(true)
        const formData = new FormData();
        formData.append("email", user.email);
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
                   <h1>Contact Us</h1>
                   <h2>We read everything you send because we care about the experience you have on Oustro</h2>
                   <div className='class-container'>
                        <div className='nname'>
                            <p>Write your message here, don't worry we read everything</p>
                        </div>
                        <TextField
                        placeholder='Write here'
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
                            Send
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
