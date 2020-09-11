import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from '../Participant/Participant.jsx';
import { Link } from 'react-router-dom';
import './Room.scss';


const Room = ({ roomName, token }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [audioClass, setAudioClass] = useState();
  const [videoClass, setVideoClass] = useState();
  const [avatarClass, setAvatarClass] = useState(false);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  const videoOffOn = () => {
    if (room && room.localParticipant.state === 'connected') {
      room.localParticipant.videoTracks.forEach((trackPublication) => {
        if (trackPublication.track.isEnabled) {
          trackPublication.track.disable();
          setVideoClass('videoOffOn');
          setAvatarClass(true);
        } else {
          trackPublication.track.enable();
          setVideoClass(' ');
          setAvatarClass(false);
        }
      });
    }
  };

  const audioOffOn = () => {
    if (room && room.localParticipant.state === 'connected') {
      room.localParticipant.audioTracks.forEach((trackPublication) => {
        if (trackPublication.track.isEnabled) {
          trackPublication.track.disable();
          setAudioClass('audioOffOn');
        } else {
          trackPublication.track.enable();
          setAudioClass(' ');
        }
      });
    }
  };

  return (
    <div className='room'>
      <h2>Room: {roomName}</h2>
      <div className='local-participant'>
        <div className='buttons'>
          <button onClick={audioOffOn} className={`audio ${audioClass}`}>
            Audio off/on
          </button>
          <button onClick={videoOffOn} className={`video ${videoClass}`}>
            Video off/on
          </button>
        </div>
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            avatarClass={avatarClass}
          />
        ) : (
            ''
          )}
        <Link to='/users'>END CALL</Link>
      </div>
      <h3>Remote Participants</h3>
      <div className='remote-participants'>{remoteParticipants}</div>
    </div>
  );
};

export default Room;
