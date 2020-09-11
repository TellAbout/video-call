import React from 'react';
import { Button, Card } from 'antd';

const UserCard = ({ username, id, role, onCall }) => {
    return (
        <Card title={`${username} ${role}`} bordered={false} style={{ width: 300 }}>
            <div className="user-card__call">
                <Button onClick={() => onCall(id)}>Call</Button>
            </div>
        </Card>
    );
};

export default UserCard;
