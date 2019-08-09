const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const {
    generateMessage
} = require('./utils/message')
const {
    isRealString
} = require('./utils/validation')

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('At localhost');
    res.send('join.html');
});

io.on('connection', (socket) => {
    console.log('New user connected.');


socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
        console.log('False')
        socket.emit('!join');
	}

    socket.join(params.room);
    // socket.leave('')
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

});

socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text))
    	socket.emit('clear');
	});
});

io.on('disconnect', (socket) => {
    console.log('User connected.');
});

server.listen(port, () => {
    console.log(`Server is on port ${port}`)
})