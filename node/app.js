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

