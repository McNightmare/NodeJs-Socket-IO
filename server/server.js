const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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

  socket.broadcast.emit('newMessage',
  generateMessage('Admin', 'A user joined the room'));

  socket.emit('newMessage',
    generateMessage('Admin', 'Welcome to the chat app'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('Message acknowledged')
  })

  socket.on('disconnect', () => {
    clients--;
    console.log(`User disconnected, ${clients} Users(s) online`);
  });
});



server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
