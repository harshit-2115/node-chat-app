const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static('public'));

app.get('/',(req,res) => {
	console.log('At localhost');
	res.send('index.html');
});

io.on('connection', (socket) => {
	console.log('New user connected.');

	socket.emit('newMessage', {
		from : 'GOD',
		text : 'You created me'
	});

	socket.on('createMessage',(message) => {
	console.log('New Message', message);
});

});

io.on('disconnect', (socket) => {
	console.log('User connected.');
});



server.listen(3000,() => {
	console.log('Listening to port 3000')
})