const config = require('../../config');
const { videoToken } = require('../tokens');

module.exports = function (io, socket, connections) {
    socket.on('call_request_response', ({ agreed, fromId, username, toUserId }) => {
        let resObj = { agreed, fromId, username, toUserId };
        if (agreed) {
            const identity = fromId;
            const room = Math.random().toString(36).substring(7);
            const token = videoToken(identity, room, config);

            resObj.roomName = room;
            resObj.token =  token;
            resObj.url = `${config.videoUrl}/${room}/${token.toJwt()}`;

            socket.emit('call_request_response', resObj);
        }

        connections.filter(q => +q.userId === +fromId).forEach(({ socketId }) => {
            io.to(socketId).emit('call_request_response', resObj);
        });
    });
}
