var socket = io();

socket.on('connect',function(){
	console.log('connected to server');
});

socket.on('disconnect', function(){
	console.log('disconnected');
});

socket.on('newEmail',function(email){                // custom event
	console.log('New Email Arrived.',email)
})