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

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'ricky',
    text: messageTextbox.val()
  }, function (data) {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Loading..')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Location');
  });
});

socket.on('newLocMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">Location</a>');

  li.text(message.from + ": ");
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});
