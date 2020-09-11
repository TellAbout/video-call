import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './LogIn.scss';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Form, Input } from 'antd';

const ENDPOINT = 'http://localhost:5000';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: 'Username is required!',
    types: {
        email: 'Email is not validate email!',
    },
};

const LogIn = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState();

    const signIn = async () => {
        await axios.post(`${ENDPOINT}/api/logIn`, { username, password })
            .then(({ data }) => {
                window.user = data;
                localStorage.setItem('user', JSON.stringify(data));
                setData(data);
            });
    }

    if (data) {
        return <Redirect to='/users' />
    }

    return (
        <div className='logIn'>
            <h1 className='header'>Log In</h1>
            <Form className='logInForm' {...layout} name="nest-messages" onFinish={signIn} validateMessages={validateMessages}>
                <Form.Item
                    name={['user', 'name']}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='Username' type='text' onChange={e => setUserName(e.target.value)}></Input>
                </Form.Item>
                <Input.Password id='input' placeholder='Enter password' type='text' onChange={e => setPassword(e.target.value)} />
                <button onClick={signIn}>Log In</button>
            </Form>
            <span className='footer'>Don't have an account? <a href='/'>Sign Up</a></span>
        </div>
    );
};

export default LogIn;