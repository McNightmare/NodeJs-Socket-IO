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

  socket.on('createMessage', (newMessage) => {
    socket.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: "newMessage.createdAt"
    });
  })

  socket.on('disconnect', () => {
    clients--;
    console.log(`User disconnected, ${clients} Users(s) online`);
  });
});



server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
