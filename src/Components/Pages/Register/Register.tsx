// @flow 
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import * as React from 'react';
export interface ISiteUser {
    fullname: string,
    password: string,
    confirmpassword: string,
    login: string,
    email: string,
}
const defaultSiteUser: ISiteUser = {
    fullname: '',
    password: '',
    confirmpassword: '',
    login: '',
    email: ''
}
export interface ICodeErrors {
    password?: string;
    email?: string;
}


const Register = () => {
    const [siteUser, setSiteUser] = React.useState<ISiteUser>(defaultSiteUser)
    const [errors, setErrors] = React.useState<ICodeErrors>({});

    function handleFullname(event: React.ChangeEvent<HTMLInputElement>): void {
        setSiteUser({ ...siteUser, fullname: event.currentTarget.value })
        //throw new Error('Function not implemented.');
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        setSiteUser({ ...siteUser, password: event.currentTarget.value })
    }

    function handleConfirmPassword(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.currentTarget.value;
        setSiteUser({ ...siteUser, confirmpassword: value })
        if (siteUser.password !== value) {
            setErrors({ ...errors, password: 'Passwords do not match' });
        } else {
            setErrors({ ...errors, password: undefined });
        }
    }


    function handleEmail(event: React.ChangeEvent<HTMLInputElement>): void {
        setSiteUser({ ...siteUser, email: event.currentTarget.value })
    }

    function handleFormSubmit(): void {
        
        let isError = false
        Object.keys(errors).forEach(element => {
            if (element) isError = true;
        })
        if(isError) return
         

    }

    return (
        <div>
            <h1>Registration</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '400px' }}>
                <Form layout="vertical">
                    <FormItem label='Fullname'>
                        <Input id='fullname' type='text'
                            onChange={handleFullname}
                            value={siteUser.fullname} ></Input>
                    </FormItem>
                    <FormItem label='Password'>
                        <Input id='password'
                            type='text'
                            onChange={handlePassword}
                            value={siteUser.email} ></Input>
                    </FormItem>
                    <FormItem label='Confirm password' 
                        help={
      siteUser.password !== siteUser.confirmpassword
        ? 'Passwords do not match'
        : null
    }>

                    <Input id='confirmpassword'
                        type='text'
                        onChange={handleConfirmPassword}
                        value={siteUser.password} ></Input>
                    {errors.password && (
                        <span style={{ color: 'red', fontSize: 12 }}>
                            {errors.password}
                        </span>
                    )}
                    </FormItem>
                    <FormItem label='Email'>

                    <Input id='fullname'
                        type='text'
                        onChange={handleEmail}
                        value={siteUser.email} ></Input>
                    </FormItem>
                    <Button type='primary' onClick={ () => handleFormSubmit() } >Register</Button>
                </Form>

            </div>
        </div>
    );
};

export default Register
