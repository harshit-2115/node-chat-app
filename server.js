const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const {generateMessage} = require('./utils/message')

app.use(express.static('public'));

app.get('/',(req,res) => {
	console.log('At localhost');
	res.send('index.html');
});	

io.on('connection', (socket) => {
	console.log('New user connected.');

	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
	socket.broadcast.emit('newMessage', generateMessage('Admin','New User Connected'));

	socket.on('createMessage',(message, callback) => {
		io.emit('newMessage',generateMessage(message.from,message.text))
		socket.emit('clear');
	});

});

io.on('disconnect', (socket) => {
	console.log('User connected.');
});



server.listen(3000,() => {
	console.log('Listening to port 3000')
})