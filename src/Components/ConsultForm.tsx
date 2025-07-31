// @flow 
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import * as React from 'react';
type Props = {
    
};

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
export const ConsultForm = (props: Props) => {
    const [formFields, setFormFields] = React.useState<IConsultForm>(defaultConsultForm)
    
    function populateForm(field: string, event: React.ChangeEvent<HTMLInputElement>): void {
        const newFormFields = {...formFields}
        newFormFields.thename = event.currentTarget.value
        setFormFields(newFormFields)
    }

    return (
        <div>
            <Form labelCol={{ span: 6 }}
                wrapperCol={{ span: 17 }}
                layout="horizontal">
                <Form.Item label="Your name">

                    <Input placeholder="Your name" value={formFields.thename} 
                    onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>  populateForm('title', event)} /></Form.Item>
                <Form.Item label='Your email'>
                    <Input placeholder="Your email" value={formFields.email} />
                </Form.Item>
                <Form.Item label='Your question'>
                    <TextArea placeholder='Write here what you want to discuss, your questions'
                        value={formFields.question}
                        rows={4} cols={50} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};