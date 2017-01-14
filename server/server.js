const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var clients = 0;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  clients++;
  console.log(`User connected, ${clients} Users(s) online`);

  socket.broadcast.emit('joinBroadcast', 'a user joined the room');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A user has joined the chatroom',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    clients--;
    console.log(`User disconnected, ${clients} Users(s) online`);
  });
});



server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
