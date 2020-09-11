module.exports = function (io, socket, connections) {
    socket.on('disconnect', (socket) => {
        const client = connections.findIndex(q => q.socketId == socket.id);
        connections.splice(client, 1);
    });
}
