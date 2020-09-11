module.exports = function (io, socket, connections) {
    socket.on('call_request', ({ fromId, username, toUserId, roomName }) => {
        connections.filter(q => +q.userId === +toUserId).forEach(({ socketId }) => {
            io.to(socketId).emit('call_request', { fromId, username, toUserId, roomName });
        });
    });
}
