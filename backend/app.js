require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const config = require('./config');
const users = require('./src/users');
const sockIo = require('./src/io');
const { videoToken } = require('./src/tokens');

sockIo.init(io);

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "localhost");
    next();
});

app.get('/api/clear', (req, res, next) => {
    res.status(200).json(sockIo.connections);
    sockIo.connections = [];
    next();
});

app.get('/api/users', (req, res, next) => {
    res.status(200).json(users);
    next();
});

app.post('/api/logIn', (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(q => q.username == username && q.password == password);

    if (user == undefined) {
        res.status(401).json({
            message: 'Invalid credentials'
        });
    } else {
        res.status(200).json(user);
    }
    next();
});

const sendTokenResponse = (token, res) => {
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            token: token.toJwt()
        })
    );
};

app.get('/video/token', (req, res) => {
    const identity = req.query.identity;
    const room = req.query.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});

app.post('/video/token', (req, res) => {
    const identity = req.body.identity;
    const room = req.body.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server started on port ${port}`));
