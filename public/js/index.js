var socket = io();


socket.on('connect', function() {
    console.log('connected to server');
});


socket.on('disconnect', function() {
    console.log('disconnected');
});


socket.on('newMessage', function(message) {
    
    var formattedTime = moment(message.createdAt).format('h:mm:ss a')

    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('clear',function(){
    jQuery('[name=message]').val('')
});



jQuery('#message-form').on('submit', function(e){
    e.preventDefault()
    
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    });

});	