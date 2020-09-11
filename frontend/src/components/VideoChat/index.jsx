import React from 'react';
import Room from './Room/Room';
import { useParams } from 'react-router-dom';

const VideoChat = () => {
  const { roomName, token } = useParams();

  if (!roomName || !token) {
    return null;
  }
  
  return <Room roomName={roomName} token={token} />;
};

export default VideoChat;
