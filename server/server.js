const express = require('express')();
const http = require('http').createServer(express);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    credentials: true
  }
});

io.on('connection', socket => {
  socket.on('message', ({name, message}) => {
    io.emit('get_message', {name, message});
  })
})

http.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});