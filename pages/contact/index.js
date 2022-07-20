import { useState, useContext, useCallback } from 'react';
import { UserContext } from '../../lib/UserContext';
import { TextField, CallToAction, ComboBox , Item, useToast} from '@magiclabs/ui';
import Loading from '../../components/Loading';
import { useRouter } from 'next/router'

function Contact() {
    const [user] = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [sending, setSending] = useState(false);
    const getformURL = "https://getform.io/f/75702bd8-ad85-44d1-bfcf-0b3cea026d82"
    const { createToast } = useToast();
    const router = useRouter();

    const formSubmit = async () => {
        if (name === "" || message === "") {
            createToast({
                message: 'Missing Required Fields',
                type: 'error',
                lifespan: 2000,
            });
            return;
        }
        setSending(true)
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("message", message);
        formData.append("name", name);
        await fetch(getformURL, {
            method: "POST",
            body: formData
        });
        router.reload(window.location.pathname);
    };

    return (
        <div>
            {user ? (
                <div>
                   <h1>Contact Us</h1>
                   <h2>We read everything you send because we care about the experience you have on Oustro</h2>
                   <div className='class-container'>
                       <TextField
                       placeholder='Name'
                       onChange={(e) => setName(e.target.value)}
                       >
                       </TextField>
                       <br />
                       <ComboBox
                        defaultInputValue=""
                        menuTrigger="focus"
                        showMenuButton
                        size="md"
                        >
                            <Item textValue="Press & PR">
                                Press & PR
                            </Item>
                            <Item textValue="Customer Support">
                                Customer Support
                            </Item>
                            <Item textValue="Feedback">
                                Feedback
                            </Item>
                        </ComboBox>
                        <textarea
                        aria-label="send email"
                        placeholder='What do you want to tell us? Please be as detailed as possible.'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        >
                        </textarea>
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
                    margin: 0 auto;
                    padding: 40px;
                    border-radius: 8px;
                    border: 1px solid #f9f9f9;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 16px;
                    text-align: center;
                }
                textarea {
                    margin-top: 15px;
                    min-width: 380px;
                    min-height: 150px;
                    border-radius: 10px;
                    resize: none;
                    outline: none;
                    font-family: Verdana;
                    font-size: 15px;
                    transition: 0.2s;
                    border: 1px solid #E5E5E5;
                    padding: 10px;
                }
                textarea:hover {
                    outline: none !important;
                    border: 1px solid #6851FF;
                }
                textarea:focus {
                    transition: 0.2s;
                    outline: none !important;
                    border: 1px solid #6851FF;
                    box-shadow: 0 0 1px 2px #6851FF; 
                }
            `}</style>
        </div>
    );
}

export default Contact;
