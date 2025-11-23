// @flow 
import { Button, Form, Input, message  } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { settings } from '../config';
import { defaultConsultForm, type IConsultForm } from '../interfaces';

export const ConsultForm = () => {
    const [formFields, setFormFields] = React.useState<IConsultForm>(defaultConsultForm)
    const [btnDisabled, setBtnDisabled] = React.useState(false)
    const startedAtRef = React.useRef<number>(0)
    const [messageSent, setMessageSent] = React.useState(false)
    function populateForm(field: keyof IConsultForm, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setFormFields(prev => ({
                ...prev,
                [field]: event.currentTarget.value
            }));
    }


    async function handleSubmit() {
        console.log({ formFields });
        const timeAfterLoad = Date.now() - startedAtRef.current;
        console.log({ timeAfterLoad });

        if (timeAfterLoad < 1000) {
            alert('Too fast');
            return;
        }

        setBtnDisabled(true);

        try {
            const response = await fetch(`${settings.apiUrl}SiteRequests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formFields),
            });

            if (!response.ok) {
                const res = await response.text();
                message.error(res || 'Failed to send your message.');
                setBtnDisabled(false);
                return; // 🚫 stop here, don’t set messageSent
            }

            message.success('Your message was sent successfully!');
            setFormFields(defaultConsultForm);
            setMessageSent(true); // ✅ only when successful
        } catch (error) {
            console.error(error);
            message.error(`Failed to send: ${error}`);
        } finally {
            setBtnDisabled(false);
        }
    }
  React.useEffect( () => {
    startedAtRef.current = Date.now()
  }, [])

    return (
        <div>

{
    !messageSent ?
      
            <Form labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                layout="horizontal">
                <Form.Item label="Your name">

                    <Input placeholder="Your name" value={formFields.theName} 
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>  populateForm('theName', event)} 
                    /></Form.Item>
                <Form.Item label='Your email'>
                    <Input placeholder="Your email" value={formFields.email}  
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>  populateForm('email', event)} 
                    />
                </Form.Item>
                <Form.Item label='Subject'>
                    <Input placeholder="Subject" value={formFields.subject}  
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>  populateForm('subject', event)} 
                    />
                </Form.Item>
                <Form.Item label='Your question'>
                    <TextArea placeholder='Write here what you want to discuss, your questions'
                        value={formFields.question}
                        
                        onChange={(event) => populateForm('question', event)}
                        rows={4} cols={50} />
                </Form.Item>
<Form.Item
  wrapperCol={{ offset: 7, span: 17 }}  // same as wrapperCol in your form
  style={{ textAlign: 'right' }}
>
                    <Button type="primary"
                        loading={btnDisabled} 
                        onClick={ handleSubmit}>Submit</Button>
                </Form.Item>
            </Form>
            : 
            <>
            <h1>Your message has been sent</h1>
            <Button onClick={() => setMessageSent(false)} >Close</Button>
            </>
            }

        </div>
    );
};