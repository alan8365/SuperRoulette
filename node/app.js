var cors = require('cors');
var express = require('express');

var app = express();
var server = app.listen(3000);

var io = require('socket.io').listen(server);

var corsOptions = {
    origin: "http://127.0.0.1:8000",
    credentials: true
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    next();
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('get-reward', (msg) => {
        console.log(msg);

        io.emit('someone-get-reward', msg);
    })
});

const rewards = [300, 400, 500, 1000, 5000];
setInterval(() => {
    if (getRndInteger(0, 10) > 5) {
        let user = '訪客 ' + getRndInteger(1, 99999999);
        let reward = rewards[getRndInteger(0, rewards.length)];

        let msg = {
            'name': user,
            'reward': reward
        };

        io.emit('someone-get-reward', msg);
    }
}, 3000);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}