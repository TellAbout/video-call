import React, { useState } from 'react';
import './SignUp.scss';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Form, Input } from 'antd';
import io, { Socket } from 'socket.io-client';
const ENDPOINT = io('http://localhost:3000');


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

const SignUp = () => {
    const onFinish = values => {
        console.log(values);
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const [socketID, setsocketID] = useState("")

    const signUp = async () => {
        await axios.post('/api/signUp', { username, firstName, lastName, email, password })
            .then((res) => {
                console.log(res)
                data.push(res.data);
                setData(data);
                // dataUsers.push(data)
                // console.log(dataUsers)
                // localStorage.setItem('users',JSON.stringify(data))
            })
            localStorage.setItem('users',JSON.stringify(data))
    }

    // console.log(JSON.parse(localStorage.getItem('users'))[0].username)

    // const sendRequest = () => {
    //     const socket = io(ENDPOINT)
    //     socket.emit('call_request', { 
    //         id: username, 
    //         otherProperty: 'other value' 
    //     });
    // }

    return (
        <div className='signUp'>
            <h1 className='header'>Sign Up</h1>
            <Form className='signUpForm' {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                <Form.Item
                    name={['First name', 'name']}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='First name' type='text' onChange={e => setFirstName(e.target.value)}></Input>
                </Form.Item>
                <Form.Item
                    name={['Last name', 'name']}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='Last name' type='text' onChange={e => setLastName(e.target.value)}></Input>
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input placeholder='Enter email' type='text' onChange={e => setEmail(e.target.value)}></Input>
                </Form.Item>
                <Input.Password id='input' placeholder='Enter password' type='text' onChange={e => setPassword(e.target.value)} />
                <button onClick={signUp}>Sign Up</button>
            </Form>
            <span className='footer'>Already have an account? <a href='/logIn'>Log In</a></span>
        </div>
    );
};

export default SignUp;

