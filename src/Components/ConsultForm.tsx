// @flow 
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import * as React from 'react';
interface IConsultForm {
    email: string, 
    thename: string, 
    question: string,
}
const defaultConsultForm: IConsultForm = {
    email: '',
    thename: '',
    question: ''
}
export const ConsultForm = () => {
    const [formFields, setFormFields] = React.useState<IConsultForm>(defaultConsultForm)
    
    function populateForm(field: keyof IConsultForm, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setFormFields(prev => ({
                ...prev,
                [field]: event.currentTarget.value
            }));
    }

    return (
        <div style={{ border: '#000 1px solid'}}>
            <Form labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                layout="horizontal">
                <Form.Item label="Your name">

                    <Input placeholder="Your name" value={formFields.thename} 
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>  populateForm('thename', event)} 
                    /></Form.Item>
                <Form.Item label='Your email'>
                    <Input placeholder="Your email" value={formFields.email}  
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>  populateForm('email', event)} 
                    />
                </Form.Item>
                <Form.Item label='Your question'>
                    <TextArea placeholder='Write here what you want to discuss, your questions'
                        value={formFields.question}
                        
                        onChange={(event) => populateForm('question', event)}
                        rows={4} cols={50} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};