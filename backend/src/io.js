
const callRequestCB = require('./socketIoCallbacks/callRequest.callback');
const callRequestResponseCB = require('./socketIoCallbacks/callRequest.response.callback');
const disconnectCB = require('./socketIoCallbacks/disconnect.callback');

let connections = [];

const onNewConnection = (socket, userId) => {
    const { id } = socket;
    connections.push({
        socketId: id,
        userId
    });
};

const init = (io) => {
    io.sockets.on('connection', (socket) => {
        if (socket.request._query.userId) {
            onNewConnection(socket, +socket.request._query.userId);

            // call_request
            callRequestCB(io, socket, connections);

            // call_request_response
            callRequestResponseCB(io, socket, connections);

            // disconnect
            disconnectCB(io, socket, connections);
        }
    }); 
}

module.exports.init = init;
module.exports.connections = connections;
