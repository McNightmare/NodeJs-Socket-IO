var socket = io();

socket.on('connect', function() {
  console.log('connected');

  socket.emit('createMessage', {
    from: "ricky",
    text: "hello world"
  });
});

socket.on('disconnect', function() {
  console.log('disconnected');
});

socket.on('newMessage', function () {
  console.log('new message');
})
