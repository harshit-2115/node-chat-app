var socket = io();


socket.on('connect', function(e) {
    var params = jQuery.deparam(window.location.search)
    
    socket.emit('join', params);
    console.log('connect');
});


socket.on('disconnect', function() {
    console.log('disconnect');
});

socket.on('!join', function(){
    alert('Invalid Entries')
    window.location.href = '/';
});

socket.on('newMessage', function(message) {
    
    var formattedTime = moment(message.createdAt).format('h:mm:ss a')

    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
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