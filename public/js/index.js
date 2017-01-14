var socket = io();

socket.on('connect', function() {
  console.log('connected');
});

socket.on('disconnect', function() {
  console.log('disconnected');
});

socket.on('newMessage', function (message) {
  console.log(message);
  var li = jQuery('<li></li>');
  li.text(message.from + ": " + message.text);

  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'ricky',
    text: jQuery('[name=message]').val()
  }, function (data) {
    console.log('Server: ' + data);
    jQuery('[name=message]').val('');
  });
});
