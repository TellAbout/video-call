import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UserCard from './userCard';
import io from 'socket.io-client';
import { Modal } from 'antd';

const ENDPOINT = 'http://localhost:5000';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [params, setParams] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const thisUserId = user.id;

    useEffect(() => {
        if (!window.socket) {
            const socket = io(ENDPOINT, {
                query: {
                    userId: thisUserId
                },
                transports: ['websocket', 'polling'],
                forceNew: true
            });

            window.socket = socket;

            window.socket.on('call_request', (param) => {
                setParams(param);
                setIsOpen(true);
            });

            window.socket.on('call_request_response', (param) => {
                if (!param.agreed) {
                    alert(`${username} declined`);
                    return;
                }

                localStorage.setItem('twilio', JSON.stringify(param.token));
                window.open(param.url);
            });
        }
    }, []);

    useEffect(() => {
        axios.get('/api/users').then(({ data }) => {
            setUsers(data);
        });
    }, []);

    const onCall = useCallback((toUserId) => {
        window.socket.emit('call_request', { fromId: thisUserId, username, toUserId });
    }, []);

   

    return (
        <>
            <h2 style={{ color: "white" }}>Current User: {username}</h2>{}
            {
                users && users.map((q) => q.username !== username && <UserCard {...q} onCall={onCall} />)
            }
            <Modal
                visible={isOpen}

                onOk={() => {
                    window.socket.emit('call_request_response', { ...params, agreed: true })
                    setIsOpen(false);
                }
                }
                onCancel={() => {
                    window.socket.emit('call_request_response', { ...params, agreed: false })
                    setIsOpen(false);
                }
                }>
                <h2>Would you like to join call with {params.username}</h2>
            </Modal>

        </>
    );
};

export default Users;